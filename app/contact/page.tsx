import React from 'react'

const contactpage = () => {
    return ( 
        <div className="container mx-auto px-4 my-30 py-8">
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
            <div className="grid md:grid-cols-2 gap-8">
            <div>
                <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-1">Name</label>
                    <input type="text" id="name" className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input type="email" id="email" className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label htmlFor="message" className="block mb-1">Message</label>
                    <textarea id="message" rows={4} className="w-full p-2 border rounded"></textarea>
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Send Message
                </button>
                </form>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <p className="mb-3">Email: info@lumbinilions.com</p>
                <p className="mb-3">Phone: +977 123 456 7890</p>
                <p className="mb-3">Address: Lumbini, Nepal</p>
                <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Follow Us</h3>
                <div className="flex space-x-4">
                    <a href="https://www.facebook.com/lumbinilions" className="hover:text-blue-600">Facebook</a>
                    <a href="#" className="hover:text-blue-400">Twitter</a>
                    <a href="https://www.instagram.com/lumbinilions/" className="hover:text-pink-600">Instagram</a>
                </div>
                </div>
            </div>
            </div>
        </div>
     );
}
 
export default contactpage;