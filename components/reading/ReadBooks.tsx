import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "@/app/context/auth";
import { useQuery } from "@tanstack/react-query";
import { getReadingBooks } from "@/api/reading";
import { Reading } from "@/libs/firestore";
import ReadBooksNone from "./ReadBooksNone";

const ReadBooks = () => {
  const { user } = useAuth();
  const { data, isFetched } = useQuery({
    queryKey: ["reading", "list"],
    queryFn: () => getReadingBooks(user?.uid ?? null),
  });

  const uniqueBooks: Reading[] | undefined = data?.filter(
    (obj, index, self) => index === self.findIndex((t) => t.title === obj.title)
  );

  if (isFetched && data?.length === 0) return <ReadBooksNone />;
  return (
    <View>
      <Text>ReadBooks</Text>
    </View>
  );
};

export default ReadBooks;
