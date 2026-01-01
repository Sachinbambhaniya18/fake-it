import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const CustomDropdown = ({ options, value, onChange, placeholder, className, renderOption }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedOption = options.find(opt => (opt.value || opt) === value);
    const displayValue = selectedOption ? (selectedOption.label || selectedOption.value || selectedOption) : placeholder;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        onChange(option.value || option);
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl 
                   cursor-pointer flex items-center justify-between transition-all
                   hover:border-black dark:hover:border-primary border-transparent
                   text-dark dark:text-white font-medium select-none"
            >
                <span className={!selectedOption ? "text-gray-400" : ""}>
                    {displayValue}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-[#1a1b26] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto custom-scrollbar">
                    {options.map((option, index) => {
                        const optValue = option.value || option;
                        const isSelected = optValue === value;

                        return (
                            <div
                                key={index}
                                onClick={() => handleSelect(option)}
                                className={`px-4 py-3 cursor-pointer transition-colors duration-150
                           ${isSelected
                                        ? 'bg-gray-100 dark:bg-white/10 text-black dark:text-white font-bold'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-dark dark:hover:text-white'
                                    }`}
                            >
                                {renderOption ? renderOption(option) : (option.label || option)}
                            </div>
                        );
                    })}
                    {options.length === 0 && (
                        <div className="px-4 py-3 text-gray-400 text-center text-sm">
                            No options available
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
