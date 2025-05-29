// This component is imported by:
// 1. ProductTabs.jsx
// 2. ProductDetails.jsx
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

// Component definition that accepts value, text, and color as props
const Ratings = ({ value , text, color }) => {
  // Ensures the rating value stays between 0 and 5
  const rating = Math.min(Math.max(value, 0), 5);
  
  // Calculates number of full stars to display
  const fullStar = Math.floor(rating);
  // Determines if a half star should be shown (if decimal is 0.5 or greater)
  const halfStar = rating - fullStar >= 0.5 ? 1 : 0;
  // Calculates remaining empty stars
  const emptyStar = 5 - fullStar - halfStar;

  return (
    // Container div with flexbox layout
    <div className="flex items-center">
      {/* Renders full stars based on rating */}
      {[...Array(fullStar)].map((_, index) => (
        <FaStar 
          key={`full-${index}`} 
          className={`text-${color}`} 
          style={{ marginLeft: '0.25rem' }}
        />
      ))}

      {/* Renders a half star if needed */}
      {halfStar === 1 && (
        <FaStarHalfAlt 
          className={`text-${color}`} 
          style={{ marginLeft: '0.25rem' }}
        />
      )}

      {/* Renders remaining empty stars */}
      {[...Array(emptyStar)].map((_, index) => (
        <FaRegStar 
          key={`empty-${index}`} 
          className={`text-${color}`} 
          style={{ marginLeft: '0.25rem' }}
        />
      ))}
      
      {/* Renders optional text next to stars if provided */}
      {text && (
        <span 
          className={`rating-text text-${color}`}
          style={{ marginLeft: '0.5rem' }}
        >
          {text}
        </span>
      )}
    </div>
  );
};

// Sets default color prop to yellow-500
Ratings.defaultProps = {
  color: "yellow-500",
};

// Exports the component
export default Ratings;
