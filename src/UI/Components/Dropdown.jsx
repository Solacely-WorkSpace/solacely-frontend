import {
  NavigationMenu,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuItem,
} from "../Components/ui/navigation-menu";

const Dropdown = () => {
  return (
    <NavigationMenu>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="mr-6 ">
          <p className=" font-bold text-black "> Spaces </p>
        </NavigationMenuTrigger>

        <NavigationMenuContent>
          <p>Hello World!!</p>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  );
};

export default Dropdown;
