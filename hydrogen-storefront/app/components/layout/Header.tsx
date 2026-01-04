import { Link, useLocation } from "@remix-run/react";
import { useState, useEffect } from "react";

interface HeaderProps {
  shop: {
    name: string;
    brand?: { logo?: { image?: { url: string; altText?: string } } };
  };
  cart: { totalQuantity?: number } | null;
  menu: Array<{
    id: string;
    title: string;
    url: string;
    items?: Array<{ id: string; title: string; url: string }>;
  }>;
  logo?: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  } | null;
}

export function Header({ shop, cart, menu, logo }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shopSubmenuOpen, setShopSubmenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHoveringTop, setIsHoveringTop] = useState(false);

  const location = useLocation();
  const isHomepage = location.pathname === "/";

  // SCROLL HANDLER
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // HOVER HANDLER (Only for homepage)
  useEffect(() => {
    if (!isHomepage) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > 50) return;
      setIsHoveringTop(e.clientY < 150);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHomepage]);

  // Route change cleanup
  useEffect(() => {
    setIsMenuOpen(false);
    setShopSubmenuOpen(false);
  }, [location]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const cartCount = cart?.totalQuantity || 0;
  const closeMenu = () => {
    setIsMenuOpen(false);
    setShopSubmenuOpen(false);
  };

  const logoUrl = logo?.url || "/logo.png";
  const logoAlt = logo?.altText || "Daily Loom Logo";

  // VISIBILITY LOGIC
  const isVisible = !isHomepage || isScrolled || isHoveringTop;
  const isSolidBg = !isHomepage || isScrolled;

  return (
    <>
      {/* Menu Overlay */}
      {isMenuOpen && (
        <div
          className="menu-overlay"
          onClick={closeMenu}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 999,
            backdropFilter: "blur(4px)",
          }}
        />
      )}

      {/* Slide-in Menu */}
      <nav
        className="header-menu"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "300px",
          height: "100vh",
          backgroundColor: "rgb(255, 249, 243)",
          boxShadow: isMenuOpen ? "-4px 0 12px rgba(0, 0, 0, 0.15)" : "none",
          transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 300ms ease-in-out",
          zIndex: 1000,
          overflow: "auto",
          padding: "80px 20px 20px",
        }}
      >
        {/* Shop Menu with Submenu */}
        <div style={{ marginBottom: "24px" }}>
          <button
            onClick={() => setShopSubmenuOpen(!shopSubmenuOpen)}
            style={{
              background: "none",
              border: "none",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              padding: "12px 0",
              color: "#2B2B2B",
            }}
          >
            Shop {shopSubmenuOpen ? "▼" : "▶"}
          </button>
          {shopSubmenuOpen && (
            <div style={{ paddingLeft: "16px", marginTop: "8px" }}>
              <Link
                to="/collections/bedsheets"
                onClick={closeMenu}
                style={{
                  display: "block",
                  padding: "8px 0",
                  fontSize: "14px",
                  color: "#666666",
                  textDecoration: "none",
                }}
              >
                Bedsheets
              </Link>
              <Link
                to="/collections/duvets"
                onClick={closeMenu}
                style={{
                  display: "block",
                  padding: "8px 0",
                  fontSize: "14px",
                  color: "#666666",
                  textDecoration: "none",
                }}
              >
                Duvets
              </Link>
              <Link
                to="/collections/towels"
                onClick={closeMenu}
                style={{
                  display: "block",
                  padding: "8px 0",
                  fontSize: "14px",
                  color: "#666666",
                  textDecoration: "none",
                }}
              >
                Towels
              </Link>
              <Link
                to="/collections/all"
                onClick={closeMenu}
                style={{
                  display: "block",
                  padding: "8px 0",
                  fontSize: "14px",
                  color: "#666666",
                  textDecoration: "none",
                }}
              >
                All Collections
              </Link>
            </div>
          )}
        </div>

        {/* Other menu links */}
        {menu.map((item) => (
          <Link
            key={item.id}
            to={item.url}
            onClick={closeMenu}
            style={{
              display: "block",
              padding: "12px 0",
              fontSize: "16px",
              fontWeight: "600",
              color: "#2B2B2B",
              textDecoration: "none",
              borderBottom: "1px solid #D9CCC4",
            }}
          >
            {item.title}
          </Link>
        ))}
      </nav>

      {/* Main Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "70px",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: isSolidBg
            ? "rgb(255, 249, 243)"
            : "rgba(255, 249, 243, 0.95)",
          borderBottom: isSolidBg ? "1px solid #D9CCC4" : "none",
          boxShadow: isSolidBg ? "0 2px 8px rgba(0,0,0,0.08)" : "none",

          opacity: isVisible ? 1 : 0,
          visibility: isVisible ? "visible" : "hidden",
          transform: isVisible ? "translateY(0px)" : "translateY(-20px)",
          pointerEvents: isVisible ? "auto" : "none",
          transition:
            "opacity 400ms ease-in-out, transform 400ms ease-in-out, background-color 300ms ease, box-shadow 300ms ease",
        }}
      >
        {/* Header Left - Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={logoAlt}
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />
            ) : (
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#6B8E72",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                DL
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#2B2B2B",
                  margin: 0,
                  letterSpacing: "0.5px",
                }}
              >
                {shop?.name || "Daily Loom"}
              </h1>
              <p
                style={{
                  fontSize: "11px",
                  color: "#666666",
                  margin: "2px 0 0",
                  lineHeight: "1.2",
                }}
              >
                Luxury Home Textiles
              </p>
            </div>
          </Link>
        </div>

        {/* Header Right - Cart & Menu */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link
            to="/cart"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
              color: "#6B8E72",
              textDecoration: "none",
            }}
          >
            🛒
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  backgroundColor: "#6B8E72",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: "600",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#6B8E72",
              padding: "0",
            }}
          >
            ☰
          </button>
        </div>
      </header>
    </>
  );
}
