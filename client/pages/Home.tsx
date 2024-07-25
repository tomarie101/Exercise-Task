import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ThemeProvider } from "../src/components/theme-provider";
import { ModeToggle } from "../src/components/mode-toggle";
import img1 from "../public/image1.png";
import img2 from "../public/image2.png";
import img3 from "../public/image3.png";
import img4 from "../public/image4.png";
import img5 from "../public/image5.png";

const images = [img1, img2, img3, img4, img5];

/**
 * Home component representing the main page of the application.
 */
const Home: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* Wrapper div with new background color */}
      <div className="min-h-screen bg-gray-300 dark:bg-gray-900">
        <div className="absolute top-4 right-56">
          <ModeToggle />
        </div>
        <div>
          <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="flex items-center space-x-4 ">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <img
                        src="/menu-icon1.png"
                        alt="Menu"
                        className="h-6 w-6"
                      />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="flex flex-col bg-gray-200 text-black">
                      <NavigationMenuLink asChild>
                        <Link to="/users">
                          <span>Users</span>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/logout">
                          <span>Logout</span>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/">
                          <span>Home</span>
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="space-x-4">
              <Link to="/login">
                <button className="bg-gray-600 text-white px-4 py-2 rounded">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-blue-400 text-black px-4 py-2 rounded">
                  Sign Up
                </button>
              </Link>
            </div>
          </nav>

          <div className="flex justify-center items-center mt-44">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-6xl relative"
            >
              <CarouselContent>
                {images.map((src, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3 "
                  >
                    <div>
                      <CardContent className="flex aspect-square items-center justify-center p-0">
                        <img
                          src={src}
                          alt={`Slide ${index + 1}`}
                          className="rounded-lg mb-4 w-full h-80 object-cover"
                        />
                      </CardContent>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
