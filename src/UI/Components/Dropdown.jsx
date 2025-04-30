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
        <NavigationMenuTrigger className="  text-center font-sans font-semibold bg-transparent shadow-none  focus:bg-transparent hover:bg-transparent border-none text-black p-7 text-base">
          <p className=" font-bold "> Spaces </p>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <p>Hello World!!</p>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  );
};

export default Dropdown;
