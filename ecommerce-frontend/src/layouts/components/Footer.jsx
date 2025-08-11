import { Link } from 'react-router-dom';
import Logo from '@assets/images/Logo/Logo.png';
import { CiMail, CiPhone, CiLocationOn } from 'react-icons/ci';

function Footer() {
  return (
    <footer className="bg-[var(--primary)] text-white mt-10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Description */}
        <div>
          <Link to="/" className="flex items-center mb-4">
            <img src={Logo} alt="Logo" className="h-12 w-24" />
            <p className="text-3xl font-bold ml-2">OwnFit</p>
          </Link>
          <p className="text-sm text-gray-200">
            OwnFit – Modern fashion, personal style, top quality products.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/products" className="hover:underline">Fashion</Link></li>
            <li><Link to="/products/sale-off" className="hover:underline">Sale Off</Link></li>
            <li><Link to="/collection" className="hover:underline">Collection</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-gray-200">
            <li className="flex items-center gap-2"><CiPhone /> +1 (123) 456-7890</li>
            <li className="flex items-center gap-2"><CiMail /> support@ownfit.com</li>
            <li className="flex items-center gap-2"><CiLocationOn /> 123 Main Street, New York, USA</li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="font-semibold mb-3">Newsletter</h3>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email..."
              className="px-3 py-2 rounded text-black flex-1"
            />
            <button
              type="submit"
              className="bg-white text-[var(--primary)] px-4 py-2 rounded font-semibold hover:bg-gray-100"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className=" text-gray-200 text-center py-4 text-sm">
        © {new Date().getFullYear()} OwnFit. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
