import {
  useSession,
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

function App() {
  //TODO ==> Google Authentication
  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

  if (isLoading) {
    return <></>;
  }

  const googleSignIn = async () => {
    const {} = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
  };
  const googleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {session ? (
        <>
          <h2 className="font-semibold text-xl">
            Hey there {session.user.email}
          </h2>
          <button
            onClick={() => googleSignOut()}
            className="p-4 border border-solid uppercase hover:bg-slate-100 rounded-lg"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => googleSignIn()}
            className="p-4 border border-solid uppercase hover:bg-slate-100 rounded-lg"
          >
            Sign In With Google
          </button>
        </>
      )}
    </div>
  );
}

export default App;
