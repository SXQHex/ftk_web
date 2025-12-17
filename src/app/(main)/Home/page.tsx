import { auth } from "@/auth";
import { LogOutBtn } from "@/components/auth/LogOutBtn";
import { redirect } from "next/navigation";

const Home = async () => {
  const user = await auth();

  if (!user?.user) {
    return redirect("/");
  }
  return (
    <div>
      Logged In user {user?.user?.email}
      <LogOutBtn />
    </div>
  );
};

export default Home;