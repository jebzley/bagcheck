import { ROUTES } from "@/constants/routes";
import { NavigationLink } from "./navigation-link";

export default function Navigation() {
  return (
    <nav className="w-full p-4">
      <ul className="flex gap-4 justify-center">
        <li>
          <NavigationLink href={ROUTES.HOME} text="> allocate" />
        </li>
        <li>
          <NavigationLink href={ROUTES.ASSESS} text="> assess" />
        </li>
      </ul>
    </nav>
  );
}
