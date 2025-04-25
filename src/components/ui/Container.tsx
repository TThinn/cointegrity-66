{services.map((service, index) => (
  <div 
    key={index} 
    className={`service-card p-6 backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300 rounded-lg ${isDarkBackground ? 'bg-white/10' : 'bg-white/95'}`}
    style={{
      animationDelay: `${0.1 + index * 0.1}s`,
      boxShadow: isDarkBackground 
        ? "0 4px 15px rgba(0, 0, 0, 0.1)" 
        : "0 4px 15px rgba(0, 0, 0, 0.05)",
      border: isDarkBackground 
        ? "1px solid rgba(255, 255, 255, 0.1)" 
        : "1px solid rgba(230, 230, 230, 0.7)"
    }}
  >
    <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4" 
         style={{ background: `linear-gradient(135deg, ${service.color}${isDarkBackground ? '30' : '20'}, ${service.color}${isDarkBackground ? '50' : '40'})` }}>
      {service.icon}
    </div>
    <h3 className={`text-xl font-semibold mb-4 ${isDarkBackground ? 'text-white' : 'text-gray-800'}`}>{service.title}</h3>
    <ul className={`leading-relaxed list-none space-y-2 ${isDarkBackground ? 'text-gray-200' : 'text-gray-600'}`}>
      {service.items.map((item, itemIndex) => (
        <li key={itemIndex} className="flex items-start">
          <span style={{ color: service.color }} className="mr-2">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
))}
