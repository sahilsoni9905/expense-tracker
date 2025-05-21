import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Store } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  showBackButton = true,
  showHomeButton = true,
}) => {
  const navigate = useNavigate();
  const { shopId } = useParams();

  const goBack = () => navigate(-1);
  const goHome = () => {
    if (shopId) {
      navigate(`/shop/${shopId}`);
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {showBackButton && (
                <button
                  onClick={goBack}
                  className="p-2 rounded-full hover:bg-blue-700 transition-colors"
                  aria-label="Go back"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              <h1 className="text-xl font-semibold">{title}</h1>
            </div>

            {showHomeButton && shopId && (
              <button
                onClick={goHome}
                className="p-2 rounded-full hover:bg-blue-700 transition-colors"
                aria-label="Go to dashboard"
              >
                <Store size={24} />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="fade-in">{children}</div>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Sahil Expense Project
        </div>
      </footer>
    </div>
  );
};

export default Layout;
