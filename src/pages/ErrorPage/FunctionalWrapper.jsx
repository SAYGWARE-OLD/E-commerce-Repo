import React from 'react';

const FunctionalWrapper = ({ children }) => {
    return (
        <div style={{ padding: '20px', border: '1px solid #ccc' }}>
            {children}
        </div>
    );
};

export default FunctionalWrapper;