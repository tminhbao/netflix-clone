import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

type Props = {
  name: string;
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const profiles = (props: Props) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  const selectProfile = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who&#39;s watching?
        </h1>
        {/* <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => selectProfile()}>
            <UserCard name={currentUser?.name} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default profiles;
