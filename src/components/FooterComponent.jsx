import React from 'react';

function FooterComponent() {
    return (
        <footer className="footer bg-dark text-light mt-auto py-3">
            <div className="container text-center">
                <span>&copy; {new Date().getFullYear()} miniIMS. All rights reserved.</span>
            </div>
        </footer>
    );
}

export default FooterComponent;
