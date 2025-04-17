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
          <p className=" font-bold text-sm"> Spaces </p>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <p>Hello World!!</p>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  );
};

export default Dropdown;
