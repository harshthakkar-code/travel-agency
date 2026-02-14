import fs from 'fs';

const css = `
/* ================================================================
   PACKAGE DETAIL HERO STYLES
   ================================================================ */
.package-hero {
  position: relative;
  padding: 150px 0 100px 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #fff;
  margin-bottom: 0;
}

.package-hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(16, 31, 70, 0.3), rgba(16, 31, 70, 0.7));
  z-index: 1;
}

.package-hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.package-hero .landing-hero-badge {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  padding: 8px 20px;
  border-radius: 30px;
  display: inline-block;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 1px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.package-hero-content .package-card-meta {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 25px !important;
  flex-wrap: wrap;
}

.package-hero-content .package-card-meta span {
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}
`;

fs.appendFileSync('d:\\travel-agency\\Frontend\\src\\index.css', css);
console.log('CSS appended successfully');
