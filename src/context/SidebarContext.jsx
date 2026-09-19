"use client";

import { createContext, useContext, useEffect, useState } from "react";

const SidebarContext = createContext(null);

const SIDEBAR_EXPANDED = "13.75rem";
const SIDEBAR_COLLAPSED = "4.5rem";
const SIDEBAR_EXPANDED_PX = 220;
const SIDEBAR_COLLAPSED_PX = 72;

export function SidebarProvider({ children }) {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : true
  );
  // Pinned open/closed. Hover peek is separate and only applies when collapsed.
  const [expanded, setExpanded] = useState(false);
  const [hoverPeek, setHoverPeek] = useState(false);

  const peekOpen = Boolean(isDesktop && !expanded && hoverPeek);
  const visuallyOpen = Boolean(expanded || peekOpen);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      const desktop = mq.matches;
      setIsDesktop(desktop);
      if (!desktop) {
        setExpanded(false);
        setHoverPeek(false);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      isDesktop ? (visuallyOpen ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED) : "0px"
    );
  }, [visuallyOpen, isDesktop]);

  useEffect(() => {
    if (!isDesktop && expanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [expanded, isDesktop]);

  const toggle = () => {
    setHoverPeek(false);
    setExpanded((v) => !v);
  };
  const close = () => {
    setHoverPeek(false);
    setExpanded(false);
  };
  const open = () => {
    setHoverPeek(false);
    setExpanded(true);
  };

  const openWidth = visuallyOpen ? SIDEBAR_EXPANDED_PX : SIDEBAR_COLLAPSED_PX;

  return (
    <SidebarContext.Provider
      value={{
        expanded,
        hoverPeek,
        setHoverPeek,
        peekOpen,
        visuallyOpen,
        isDesktop,
        toggle,
        close,
        open,
        widthExpanded: SIDEBAR_EXPANDED,
        widthCollapsed: SIDEBAR_COLLAPSED,
        // Page layout shifts for both pinned open and hover peek
        widthPx: isDesktop ? openWidth : 0,
        visualWidthPx: isDesktop ? openWidth : 0,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
