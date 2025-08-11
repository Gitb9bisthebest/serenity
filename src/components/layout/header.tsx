import { Navigation } from "./navigation";
import UserButton from "./user-button";

export default function Header() {
  return (
    <header>
      <Navigation userButton={<UserButton />} />
    </header>
  );
}
