/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/api/auth";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "expo-router";
import { useAuth } from "@/app/context/auth";

export default function useAuthChange() {
  const { user: authUser } = useAuth();
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(authUser?.uid),
    enabled: !!authUser?.uid,
  });
  const { user, setUser, clearUser } = useUserStore();
  const router = useRouter();

  // 인증 상태 로깅
  useEffect(() => {
    console.log("Firebase Auth State:", authUser ? "Logged in" : "Logged out");
    console.log(
      "Zustand User State:",
      user ? "User data exists" : "No user data",
    );
  }, [authUser, user]);

  // 인증 상태에 따른 라우팅 처리
  useEffect(() => {
    if (authUser === null && user === null) {
      console.log("Redirecting to login page");
      router.replace("/auth/login");
    }
  }, [authUser, user]);

  // 사용자 데이터 동기화
  useEffect(() => {
    if (authUser && data) {
      console.log("Setting user data in Zustand store");
      setUser(data);
    } else if (!authUser) {
      console.log("Clearing user data from Zustand store");
      clearUser();
    }
  }, [authUser, data]);
}
