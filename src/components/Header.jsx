import React from 'react';
import Link from 'next/link'; 

function Header() {
  return (
    <header className="site-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#222', color: '#fff' }}>
      <div className="logo">
        <Link href="/">Mening Saytim</Link>
      </div>
      <nav className="nav-links" style={{ display: 'flex', gap: '20px' }}>
        <Link href="/">Bosh sahifa</Link>
        <Link href="/about">Biz haqimizda</Link>
        <Link href="/products">Mahsulotlar</Link>
      </nav>
    </header>
  );
}

export default Header;