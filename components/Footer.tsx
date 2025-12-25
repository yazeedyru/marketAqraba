
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-500 rounded-full inline-block"></span>
              متجر عقربا
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              وجهتكم الأولى للتسوق الإلكتروني في منطقة عقربا. نوفر لكم تشكيلة واسعة من المنتجات من مختلف المحلات المحلية بجودة عالية وأسعار منافسة.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-blue-400 transition-colors cursor-pointer">الرئيسية</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">أحدث العروض</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">أقسام المتجر</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">تواصل معنا</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">تواصل معنا</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-center gap-3">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                عقربا - نابلس - فلسطين
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                0594067455
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                Yazeedrani55@gmail.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} متجر عقربا. جميع الحقوق محفوظة. تطوير: يزيد راني</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
