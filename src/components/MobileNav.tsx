
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Briefcase, User, Phone, BookOpen, Bell } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Services", href: "/services", icon: Briefcase },
  { name: "About", href: "/about", icon: User },
  { name: "Contact", href: "/contact", icon: Phone },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Updates", href: "/updates", icon: Bell },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="md:hidden">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[80vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle>Navigation Menu</DrawerTitle>
          </DrawerHeader>
          <nav className="flex flex-col space-y-1 px-4 pb-6">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center space-x-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
