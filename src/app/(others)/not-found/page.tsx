import Footer from '@/components/common/footer/footer';
import { MainNav } from '@/components/common/nav/main-navbar';


const NotFoundPage = () => {
    return (
      <div>
      <MainNav/>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Oops! Page Not Found</h2>
          <p className="text-gray-500 mb-6">
            The page you are looking for might have been moved or deleted.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
          >
            Go Back Home
          </a>
        </div>
      </div>
      <Footer/>
      </div>
    );
  };
  
  export default NotFoundPage;
  