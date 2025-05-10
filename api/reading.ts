import { db, storage } from "@/libs/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { Reading, readingConverter } from "@/libs/firestore";
import { deleteObject, ref } from "firebase/storage";

export const getReadingBooks = async (uid: string | null, title?: string) => {
  if (!uid) throw new Error("로그인 해주세요");
  const queries = [where("uid", "==", uid)];
  if (title) queries.push(where("title", "==", title));

  const result: Reading[] = [];
  const q = query(collection(db, "reading"), ...queries).withConverter(
    readingConverter
  );
  const docSnap = await getDocs(q);

  docSnap.forEach((book) => {
    const data = book.data();
    result.push(data);
  });
  return result;
};

export const deleteReadingBooks = async (
  uid: string | null,
  items: (Reading | undefined)[]
) => {
  if (!uid) throw new Error("로그인 해주세요");
  // 트랜젝션 시작
  const batch = writeBatch(db);
  items.forEach(async (item) => {
    if (!item) throw new Error("삭제할 항목이 없습니다.");

    // 삭제할 이미지가 있으면
    if (item.images.length > 0) {
      // 이미지 파일들 삭제
      item.images.forEach(async (image) => {
        const imgRef = ref(storage, image.imageRef);
        await deleteObject(imgRef);
      });
    }

    if (item.record) {
      // 녹음 파일을 삭제
      const recordRef = ref(storage, item.record.recordRef);
      await deleteObject(recordRef);
    }

    // 문서 삭제
    const docRef = doc(db, "reading", item.id);
    batch.delete(docRef);
  });
  // 트랜젝션 커밋
  await batch.commit();
};
