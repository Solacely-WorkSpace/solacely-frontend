import {
  NavigationMenu,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuItem,
} from "./ui/navigation-menu";

const Dropdown = () => {
  return (
    <NavigationMenu>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="  text-center font-sans font-semibold bg-transparent shadow-none  focus:bg-transparent hover:bg-transparent border-none text-black p-7">
          Spaces
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <p>Hello World!!</p>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  );
};

export default Dropdown;
