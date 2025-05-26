import { Heart, Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Github } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: "About Us", href: "/about" },
            { name: "Our Story", href: "/story" },
            { name: "Careers", href: "/careers" },
            { name: "Press", href: "/press" },
        ],
        support: [
            { name: "Help Center", href: "/help" },
            { name: "Contact Us", href: "/contact" },
            { name: "Shipping Info", href: "/shipping" },
            { name: "Returns", href: "/returns" },
        ],
        shop: [
            { name: "Living Room", href: "/category/living-room" },
            { name: "Bedroom", href: "/category/bedroom" },
            { name: "Kitchen", href: "/category/kitchen" },
            { name: "Office", href: "/category/office" },
        ],
        legal: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Cookie Policy", href: "/cookies" },
            { name: "Sitemap", href: "/sitemap" },
        ]
    };

    const socialLinks = [
        { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/harshvardhan-sharma-88b414256/" },
        { name: "Twitter", icon: Twitter, href: "https://x.com/Harshvardhan123" },
        { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/hvs_harshvardhan21/" },
        { name: "GitHub", icon: Github, href: "https://www.github.com/Harshvardhan2164" },
    ];

    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                HomeCraft
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
                                Creating beautiful homes and lasting memories with affordable, 
                                stylish furniture and home decoration that suits every lifestyle.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                <Mail size={18} className="mr-3 text-gray-500 dark:text-gray-400" />
                                <span>hello@homecraft.com</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                <Phone size={18} className="mr-3 text-gray-500 dark:text-gray-400" />
                                <span>+91 1234545678</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                <MapPin size={18} className="mr-3 text-gray-500 dark:text-gray-400" />
                                <span>Ashwini Nagar, Raipur, Chhattisgarh</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-4 mt-6">
                            {socialLinks.map((social) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                                        aria-label={social.name}
                                    >
                                        <IconComponent size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Support
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Shop
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="max-w-md">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Stay Updated
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Get the latest updates on new products and exclusive offers.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-gray-700 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                            <span>© {currentYear} FurnitureStore. Made with</span>
                            <Heart size={16} className="mx-1 text-red-500" />
                            <span>for beautiful homes</span>
                        </div>
                        
                        <div className="flex flex-wrap justify-center md:justify-end space-x-6">
                            {footerLinks.legal.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;