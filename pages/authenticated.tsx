import React from "react";
import nookies from "nookies";
import { useRouter } from 'next/router'
import { firebaseAdmin } from "../config/firebaseAdmin";
import { firebaseClient } from "../config/firebaseClient";

import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    try {
        const cookies = nookies.get(ctx);
        console.log(JSON.stringify(cookies, null, 2));
        const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
        const { uid, email } = token;
        return {
            props: { message: `Your email is ${email} and your UID is ${uid}.` },
        };
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props: {} as never,
        };
    }
};

function AuthenticatedPage(
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const router = useRouter();
    return (
        <div>
            <p>{props.message!}</p>
            <button
                onClick={async () => {
                await firebaseClient
                    .auth()
                    .signOut()
                    .then(() => {
                        router.push("/login");
                    });
                }}
            >
                Sign out
            </button>
        </div>
    );
}

export default AuthenticatedPage;