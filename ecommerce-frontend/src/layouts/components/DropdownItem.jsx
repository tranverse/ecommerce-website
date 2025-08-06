import React from 'react';

const DropdownItem = ({Icon, itemName}) => {
    return (
        <div className="p-1 flex items-center gap-3 rounded hover:cursor-pointer  my-2 hover:bg-[var(--primary)]  hover:text-white group">
            <Icon className="text-3xl text-[var(--primary)] cursor-pointer group-hover:text-white " />
            {itemName}
        </div>
    );
};

export default DropdownItem;
