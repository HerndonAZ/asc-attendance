"use client";
import { Button } from "@/ui/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const DarkModeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className=" z-50 bg-background/80 backdrop-blur-sm border border-border hover:bg-accent p-2 rounded-lg shadow-lg transition-colors duration-300 flex items-center justify-center">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
        className="p-2 h-8 w-8"
      >
        {theme === "dark" ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
};

export default DarkModeSwitch;

export const SidebarDarkModeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
      className="p-2"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </Button>
  );
};
