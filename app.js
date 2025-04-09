import React, { useState, useEffect, useMemo, useCallback } from 'react';

// --- Data: Countries and Territories ---
// Based on UN members, observers, and major dependent territories.
// In a real app, this might come from an API.
const placesData = [
  // UN Members (193) - Sampled for brevity, add more as needed
  { code: 'AF', name: 'Afghanistan', type: 'country' },
  { code: 'AL', name: 'Albania', type: 'country' },
  { code: 'DZ', name: 'Algeria', type: 'country' },
  { code: 'AD', name: 'Andorra', type: 'country' },
  { code: 'AO', name: 'Angola', type: 'country' },
  { code: 'AG', name: 'Antigua and Barbuda', type: 'country' },
  { code: 'AR', name: 'Argentina', type: 'country' },
  { code: 'AM', name: 'Armenia', type: 'country' },
  { code: 'AU', name: 'Australia', type: 'country' },
  { code: 'AT', name: 'Austria', type: 'country' },
  { code: 'AZ', name: 'Azerbaijan', type: 'country' },
  { code: 'BS', name: 'Bahamas', type: 'country' },
  { code: 'BH', name: 'Bahrain', type: 'country' },
  { code: 'BD', name: 'Bangladesh', type: 'country' },
  { code: 'BB', name: 'Barbados', type: 'country' },
  { code: 'BY', name: 'Belarus', type: 'country' },
  { code: 'BE', name: 'Belgium', type: 'country' },
  { code: 'BZ', name: 'Belize', type: 'country' },
  { code: 'BJ', name: 'Benin', type: 'country' },
  { code: 'BT', name: 'Bhutan', type: 'country' },
  { code: 'BO', name: 'Bolivia', type: 'country' },
  { code: 'BA', name: 'Bosnia and Herzegovina', type: 'country' },
  { code: 'BW', name: 'Botswana', type: 'country' },
  { code: 'BR', name: 'Brazil', type: 'country' },
  { code: 'BN', name: 'Brunei', type: 'country' },
  { code: 'BG', name: 'Bulgaria', type: 'country' },
  { code: 'BF', name: 'Burkina Faso', type: 'country' },
  { code: 'BI', name: 'Burundi', type: 'country' },
  { code: 'CV', name: 'Cabo Verde', type: 'country' },
  { code: 'KH', name: 'Cambodia', type: 'country' },
  { code: 'CM', name: 'Cameroon', type: 'country' },
  { code: 'CA', name: 'Canada', type: 'country' },
  { code: 'CF', name: 'Central African Republic', type: 'country' },
  { code: 'TD', name: 'Chad', type: 'country' },
  { code: 'CL', name: 'Chile', type: 'country' },
  { code: 'CN', name: 'China', type: 'country' },
  { code: 'CO', name: 'Colombia', type: 'country' },
  { code: 'KM', name: 'Comoros', type: 'country' },
  { code: 'CG', name: 'Congo (Republic of the)', type: 'country' },
  { code: 'CD', name: 'Congo (Democratic Republic of the)', type: 'country' },
  { code: 'CR', name: 'Costa Rica', type: 'country' },
  { code: 'CI', name: 'Côte d\'Ivoire', type: 'country' },
  { code: 'HR', name: 'Croatia', type: 'country' },
  { code: 'CU', name: 'Cuba', type: 'country' },
  { code: 'CY', name: 'Cyprus', type: 'country' },
  { code: 'CZ', name: 'Czech Republic', type: 'country' },
  { code: 'DK', name: 'Denmark', type: 'country' },
  { code: 'DJ', name: 'Djibouti', type: 'country' },
  { code: 'DM', name: 'Dominica', type: 'country' },
  { code: 'DO', name: 'Dominican Republic', type: 'country' },
  { code: 'EC', name: 'Ecuador', type: 'country' },
  { code: 'EG', name: 'Egypt', type: 'country' },
  { code: 'SV', name: 'El Salvador', type: 'country' },
  { code: 'GQ', name: 'Equatorial Guinea', type: 'country' },
  { code: 'ER', name: 'Eritrea', type: 'country' },
  { code: 'EE', name: 'Estonia', type: 'country' },
  { code: 'SZ', name: 'Eswatini', type: 'country' },
  { code: 'ET', name: 'Ethiopia', type: 'country' },
  { code: 'FJ', name: 'Fiji', type: 'country' },
  { code: 'FI', name: 'Finland', type: 'country' },
  { code: 'FR', name: 'France', type: 'country' },
  { code: 'GA', name: 'Gabon', type: 'country' },
  { code: 'GM', name: 'Gambia', type: 'country' },
  { code: 'GE', name: 'Georgia', type: 'country' },
  { code: 'DE', name: 'Germany', type: 'country' },
  { code: 'GH', name: 'Ghana', type: 'country' },
  { code: 'GR', name: 'Greece', type: 'country' },
  { code: 'GD', name: 'Grenada', type: 'country' },
  { code: 'GT', name: 'Guatemala', type: 'country' },
  { code: 'GN', name: 'Guinea', type: 'country' },
  { code: 'GW', name: 'Guinea-Bissau', type: 'country' },
  { code: 'GY', name: 'Guyana', type: 'country' },
  { code: 'HT', name: 'Haiti', type: 'country' },
  { code: 'HN', name: 'Honduras', type: 'country' },
  { code: 'HU', name: 'Hungary', type: 'country' },
  { code: 'IS', name: 'Iceland', type: 'country' },
  { code: 'IN', name: 'India', type: 'country' },
  { code: 'ID', name: 'Indonesia', type: 'country' },
  { code: 'IR', name: 'Iran', type: 'country' },
  { code: 'IQ', name: 'Iraq', type: 'country' },
  { code: 'IE', name: 'Ireland', type: 'country' },
  { code: 'IL', name: 'Israel', type: 'country' },
  { code: 'IT', name: 'Italy', type: 'country' },
  { code: 'JM', name: 'Jamaica', type: 'country' },
  { code: 'JP', name: 'Japan', type: 'country' },
  { code: 'JO', name: 'Jordan', type: 'country' },
  { code: 'KZ', name: 'Kazakhstan', type: 'country' },
  { code: 'KE', name: 'Kenya', type: 'country' },
  { code: 'KI', name: 'Kiribati', type: 'country' },
  { code: 'KP', name: 'Korea (North)', type: 'country' },
  { code: 'KR', name: 'Korea (South)', type: 'country' },
  { code: 'KW', name: 'Kuwait', type: 'country' },
  { code: 'KG', name: 'Kyrgyzstan', type: 'country' },
  { code: 'LA', name: 'Laos', type: 'country' },
  { code: 'LV', name: 'Latvia', type: 'country' },
  { code: 'LB', name: 'Lebanon', type: 'country' },
  { code: 'LS', name: 'Lesotho', type: 'country' },
  { code: 'LR', name: 'Liberia', type: 'country' },
  { code: 'LY', name: 'Libya', type: 'country' },
  { code: 'LI', name: 'Liechtenstein', type: 'country' },
  { code: 'LT', name: 'Lithuania', type: 'country' },
  { code: 'LU', name: 'Luxembourg', type: 'country' },
  { code: 'MG', name: 'Madagascar', type: 'country' },
  { code: 'MW', name: 'Malawi', type: 'country' },
  { code: 'MY', name: 'Malaysia', type: 'country' },
  { code: 'MV', name: 'Maldives', type: 'country' },
  { code: 'ML', name: 'Mali', type: 'country' },
  { code: 'MT', name: 'Malta', type: 'country' },
  { code: 'MH', name: 'Marshall Islands', type: 'country' },
  { code: 'MR', name: 'Mauritania', type: 'country' },
  { code: 'MU', name: 'Mauritius', type: 'country' },
  { code: 'MX', name: 'Mexico', type: 'country' },
  { code: 'FM', name: 'Micronesia', type: 'country' },
  { code: 'MD', name: 'Moldova', type: 'country' },
  { code: 'MC', name: 'Monaco', type: 'country' },
  { code: 'MN', name: 'Mongolia', type: 'country' },
  { code: 'ME', name: 'Montenegro', type: 'country' },
  { code: 'MA', name: 'Morocco', type: 'country' },
  { code: 'MZ', name: 'Mozambique', type: 'country' },
  { code: 'MM', name: 'Myanmar (Burma)', type: 'country' },
  { code: 'NA', name: 'Namibia', type: 'country' },
  { code: 'NR', name: 'Nauru', type: 'country' },
  { code: 'NP', name: 'Nepal', type: 'country' },
  { code: 'NL', name: 'Netherlands', type: 'country' },
  { code: 'NZ', name: 'New Zealand', type: 'country' },
  { code: 'NI', name: 'Nicaragua', type: 'country' },
  { code: 'NE', name: 'Niger', type: 'country' },
  { code: 'NG', name: 'Nigeria', type: 'country' },
  { code: 'MK', name: 'North Macedonia', type: 'country' },
  { code: 'NO', name: 'Norway', type: 'country' },
  { code: 'OM', name: 'Oman', type: 'country' },
  { code: 'PK', name: 'Pakistan', type: 'country' },
  { code: 'PW', name: 'Palau', type: 'country' },
  { code: 'PA', name: 'Panama', type: 'country' },
  { code: 'PG', name: 'Papua New Guinea', type: 'country' },
  { code: 'PY', name: 'Paraguay', type: 'country' },
  { code: 'PE', name: 'Peru', type: 'country' },
  { code: 'PH', name: 'Philippines', type: 'country' },
  { code: 'PL', name: 'Poland', type: 'country' },
  { code: 'PT', name: 'Portugal', type: 'country' },
  { code: 'QA', name: 'Qatar', type: 'country' },
  { code: 'RO', name: 'Romania', type: 'country' },
  { code: 'RU', name: 'Russia', type: 'country' },
  { code: 'RW', name: 'Rwanda', type: 'country' },
  { code: 'KN', name: 'Saint Kitts and Nevis', type: 'country' },
  { code: 'LC', name: 'Saint Lucia', type: 'country' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', type: 'country' },
  { code: 'WS', name: 'Samoa', type: 'country' },
  { code: 'SM', name: 'San Marino', type: 'country' },
  { code: 'ST', name: 'Sao Tome and Principe', type: 'country' },
  { code: 'SA', name: 'Saudi Arabia', type: 'country' },
  { code: 'SN', name: 'Senegal', type: 'country' },
  { code: 'RS', name: 'Serbia', type: 'country' },
  { code: 'SC', name: 'Seychelles', type: 'country' },
  { code: 'SL', name: 'Sierra Leone', type: 'country' },
  { code: 'SG', name: 'Singapore', type: 'country' },
  { code: 'SK', name: 'Slovakia', type: 'country' },
  { code: 'SI', name: 'Slovenia', type: 'country' },
  { code: 'SB', name: 'Solomon Islands', type: 'country' },
  { code: 'SO', name: 'Somalia', type: 'country' },
  { code: 'ZA', name: 'South Africa', type: 'country' },
  { code: 'SS', name: 'South Sudan', type: 'country' },
  { code: 'ES', name: 'Spain', type: 'country' },
  { code: 'LK', name: 'Sri Lanka', type: 'country' },
  { code: 'SD', name: 'Sudan', type: 'country' },
  { code: 'SR', name: 'Suriname', type: 'country' },
  { code: 'SE', name: 'Sweden', type: 'country' },
  { code: 'CH', name: 'Switzerland', type: 'country' },
  { code: 'SY', name: 'Syria', type: 'country' },
  { code: 'TJ', name: 'Tajikistan', type: 'country' },
  { code: 'TZ', name: 'Tanzania', type: 'country' },
  { code: 'TH', name: 'Thailand', type: 'country' },
  { code: 'TL', name: 'Timor-Leste', type: 'country' },
  { code: 'TG', name: 'Togo', type: 'country' },
  { code: 'TO', name: 'Tonga', type: 'country' },
  { code: 'TT', name: 'Trinidad and Tobago', type: 'country' },
  { code: 'TN', name: 'Tunisia', type: 'country' },
  { code: 'TR', name: 'Turkey', type: 'country' },
  { code: 'TM', name: 'Turkmenistan', type: 'country' },
  { code: 'TV', name: 'Tuvalu', type: 'country' },
  { code: 'UG', name: 'Uganda', type: 'country' },
  { code: 'UA', name: 'Ukraine', type: 'country' },
  { code: 'AE', name: 'United Arab Emirates', type: 'country' },
  { code: 'GB', name: 'United Kingdom', type: 'country' },
  { code: 'US', name: 'United States', type: 'country' },
  { code: 'UY', name: 'Uruguay', type: 'country' },
  { code: 'UZ', name: 'Uzbekistan', type: 'country' },
  { code: 'VU', name: 'Vanuatu', type: 'country' },
  { code: 'VE', name: 'Venezuela', type: 'country' },
  { code: 'VN', name: 'Vietnam', type: 'country' },
  { code: 'YE', name: 'Yemen', type: 'country' },
  { code: 'ZM', name: 'Zambia', type: 'country' },
  { code: 'ZW', name: 'Zimbabwe', type: 'country' },

  // UN Observer States (2)
  { code: 'VA', name: 'Vatican City', type: 'country' },
  { code: 'PS', name: 'Palestine', type: 'country' }, // State of Palestine

  // Dependent Territories (Sample - add more as needed)
  { code: 'AS', name: 'American Samoa', type: 'territory', parent: 'US' },
  { code: 'AI', name: 'Anguilla', type: 'territory', parent: 'GB' },
  { code: 'AW', name: 'Aruba', type: 'territory', parent: 'NL' },
  { code: 'BM', name: 'Bermuda', type: 'territory', parent: 'GB' },
  { code: 'BQ', name: 'Bonaire, Sint Eustatius and Saba', type: 'territory', parent: 'NL' }, // Caribbean Netherlands
  { code: 'IO', name: 'British Indian Ocean Territory', type: 'territory', parent: 'GB' },
  { code: 'VG', name: 'British Virgin Islands', type: 'territory', parent: 'GB' },
  { code: 'KY', name: 'Cayman Islands', type: 'territory', parent: 'GB' },
  { code: 'CK', name: 'Cook Islands', type: 'territory', parent: 'NZ' }, // In free association
  { code: 'CW', name: 'Curaçao', type: 'territory', parent: 'NL' },
  { code: 'FK', name: 'Falkland Islands', type: 'territory', parent: 'GB' },
  { code: 'FO', name: 'Faroe Islands', type: 'territory', parent: 'DK' },
  { code: 'PF', name: 'French Polynesia', type: 'territory', parent: 'FR' },
  { code: 'GI', name: 'Gibraltar', type: 'territory', parent: 'GB' },
  { code: 'GL', name: 'Greenland', type: 'territory', parent: 'DK' },
  { code: 'GP', name: 'Guadeloupe', type: 'territory', parent: 'FR' }, // Overseas department/region
  { code: 'GU', name: 'Guam', type: 'territory', parent: 'US' },
  { code: 'GG', name: 'Guernsey', type: 'territory', parent: 'GB' }, // Crown Dependency
  { code: 'HK', name: 'Hong Kong', type: 'territory', parent: 'CN' }, // SAR
  { code: 'IM', name: 'Isle of Man', type: 'territory', parent: 'GB' }, // Crown Dependency
  { code: 'JE', name: 'Jersey', type: 'territory', parent: 'GB' }, // Crown Dependency
  { code: 'MO', name: 'Macao', type: 'territory', parent: 'CN' }, // SAR
  { code: 'MQ', name: 'Martinique', type: 'territory', parent: 'FR' }, // Overseas department/region
  { code: 'MS', name: 'Montserrat', type: 'territory', parent: 'GB' },
  { code: 'NC', name: 'New Caledonia', type: 'territory', parent: 'FR' },
  { code: 'NU', name: 'Niue', type: 'territory', parent: 'NZ' }, // In free association
  { code: 'NF', name: 'Norfolk Island', type: 'territory', parent: 'AU' },
  { code: 'MP', name: 'Northern Mariana Islands', type: 'territory', parent: 'US' },
  { code: 'PN', name: 'Pitcairn Islands', type: 'territory', parent: 'GB' },
  { code: 'PR', name: 'Puerto Rico', type: 'territory', parent: 'US' },
  { code: 'RE', name: 'Réunion', type: 'territory', parent: 'FR' }, // Overseas department/region
  { code: 'BL', name: 'Saint Barthélemy', type: 'territory', parent: 'FR' },
  { code: 'SH', name: 'Saint Helena, Ascension and Tristan da Cunha', type: 'territory', parent: 'GB' },
  { code: 'MF', name: 'Saint Martin', type: 'territory', parent: 'FR' },
  { code: 'PM', name: 'Saint Pierre and Miquelon', type: 'territory', parent: 'FR' },
  { code: 'SX', name: 'Sint Maarten', type: 'territory', parent: 'NL' },
  { code: 'GS', name: 'South Georgia and the South Sandwich Islands', type: 'territory', parent: 'GB' },
  { code: 'TW', name: 'Taiwan', type: 'territory' }, // Disputed/Special status, often tracked separately
  { code: 'TK', name: 'Tokelau', type: 'territory', parent: 'NZ' },
  { code: 'TC', name: 'Turks and Caicos Islands', type: 'territory', parent: 'GB' },
  { code: 'VI', name: 'U.S. Virgin Islands', type: 'territory', parent: 'US' },
  { code: 'WF', name: 'Wallis and Futuna', type: 'territory', parent: 'FR' },
  { code: 'EH', name: 'Western Sahara', type: 'territory' }, // Disputed
].sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name

// --- Helper Functions ---
const getFlagUrl = (countryCode) => {
  // Using flagcdn.com for flags - simple and free
  // Returns a URL for the flag image
  // Added error handling for potentially invalid codes (though unlikely with this list)
  if (!countryCode || typeof countryCode !== 'string') return ''; // Return empty string for invalid input
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
};

// --- Components ---

// Component for displaying a single place (country/territory) card
const PlaceCard = React.memo(({ place, onToggleVisited, isVisited }) => {
  // Memoized to prevent unnecessary re-renders when list changes elsewhere
  const flagUrl = getFlagUrl(place.code); // Get flag URL

  return (
    <div className={`
      p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out border
      ${isVisited ? 'bg-blue-100 border-blue-300 transform scale-[1.03]' : 'bg-white border-gray-200 hover:shadow-lg'}
    `}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3 overflow-hidden mr-2"> {/* Added overflow-hidden and margin */}
          {flagUrl ? ( // Conditionally render image only if URL is valid
            <img
              src={flagUrl}
              alt={`${place.name} flag`}
              className="w-8 h-auto object-contain rounded shadow flex-shrink-0" // Added object-contain and flex-shrink-0
              // Basic fallback in case image fails to load
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'inline'; }}
            />
          ) : (
             // Display code if flag URL is invalid (e.g., missing code)
            <span className="text-sm font-mono text-gray-400 w-8 text-center flex-shrink-0">{place.code}</span>
          )}
           {/* Fallback text if image fails (hidden by default) */}
          <span className="hidden text-xl">{place.code}</span>
          <h3 className="text-lg font-semibold text-gray-800 truncate">{place.name}</h3> {/* Added truncate */}
        </div>
        <button
          onClick={() => onToggleVisited(place.code)}
          className={`
            px-3 py-1 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0
            ${isVisited ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'}
          `} // Added whitespace-nowrap and flex-shrink-0
        >
          {isVisited ? 'Remove' : 'Add'}
        </button>
      </div>
      <p className="text-sm text-gray-500 capitalize">
        Type: {place.type} {place.parent ? `(${place.parent})` : ''}
      </p>
    </div>
  );
});

// Component for the main dashboard
const Dashboard = ({ username, visitedPlaces, setVisitedPlaces, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'country', 'territory'
  const [showOnlyVisited, setShowOnlyVisited] = useState(false);

  // Memoize filtered list for performance
  const filteredPlaces = useMemo(() => {
    // Ensure visitedPlaces is an array before using .includes()
    const safeVisitedPlaces = Array.isArray(visitedPlaces) ? visitedPlaces : [];
    return placesData.filter(place => {
      const nameMatch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = filterType === 'all' || place.type === filterType;
      const visitedMatch = !showOnlyVisited || safeVisitedPlaces.includes(place.code);
      return nameMatch && typeMatch && visitedMatch;
    });
  }, [searchTerm, filterType, showOnlyVisited, visitedPlaces]);

  // Toggle visited status for a place
  const handleToggleVisited = useCallback((code) => {
    setVisitedPlaces(prevVisited => {
      // Ensure prevVisited is always an array
      const currentVisited = Array.isArray(prevVisited) ? prevVisited : [];
      const newVisited = new Set(currentVisited);
      if (newVisited.has(code)) {
        newVisited.delete(code);
      } else {
        newVisited.add(code);
      }
      return Array.from(newVisited); // Convert back to array for storage/state
    });
  }, [setVisitedPlaces]); // Dependency ensures function updates if setVisitedPlaces changes

  // Calculate metrics
  const totalCountries = useMemo(() => placesData.filter(p => p.type === 'country').length, []);
  const totalTerritories = useMemo(() => placesData.filter(p => p.type === 'territory').length, []);

  // Ensure visitedPlaces is an array before filtering/calculating length
  const safeVisitedPlaces = Array.isArray(visitedPlaces) ? visitedPlaces : [];

  const visitedCountriesCount = useMemo(() => safeVisitedPlaces.filter(code => placesData.find(p => p.code === code)?.type === 'country').length, [safeVisitedPlaces]);
  const visitedTerritoriesCount = useMemo(() => safeVisitedPlaces.filter(code => placesData.find(p => p.code === code)?.type === 'territory').length, [safeVisitedPlaces]);

  const visitedCountriesPercent = totalCountries > 0 ? ((visitedCountriesCount / totalCountries) * 100).toFixed(1) : 0;
  const visitedTerritoriesPercent = totalTerritories > 0 ? ((visitedTerritoriesCount / totalTerritories) * 100).toFixed(1) : 0;
  const totalVisitedPercent = placesData.length > 0 ? ((safeVisitedPlaces.length / placesData.length) * 100).toFixed(1) : 0;

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-blue-600 mb-2 sm:mb-0">Travel Tracker</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Welcome, {username}!</span>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Metrics Section */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Progress</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-3xl font-bold text-blue-700">{safeVisitedPlaces.length} / {placesData.length}</div>
            <div className="text-sm text-gray-600">Total Places Visited ({totalVisitedPercent}%)</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl font-bold text-green-700">{visitedCountriesCount} / {totalCountries}</div>
            <div className="text-sm text-gray-600">Countries Visited ({visitedCountriesPercent}%)</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-3xl font-bold text-yellow-700">{visitedTerritoriesCount} / {totalTerritories}</div>
            <div className="text-sm text-gray-600">Territories Visited ({visitedTerritoriesPercent}%)</div>
          </div>
        </div>
      </section>

      {/* Filters and Search Section */}
      <section className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search places..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All Types</option>
            <option value="country">Countries</option>
            <option value="territory">Territories</option>
          </select>
          {/* Visited Filter */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyVisited}
              onChange={(e) => setShowOnlyVisited(e.target.checked)}
              className="rounded text-blue-500 focus:ring-blue-400"
            />
            <span className="text-gray-700">Show Only Visited</span>
          </label>
        </div>
      </section>

      {/* Places List Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {showOnlyVisited ? 'Visited Places' : 'All Places'} ({filteredPlaces.length})
        </h2>
        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlaces.map(place => (
              <PlaceCard
                key={place.code} // Use unique code as key
                place={place}
                onToggleVisited={handleToggleVisited}
                isVisited={safeVisitedPlaces.includes(place.code)} // Use safeVisitedPlaces
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8">No places match your current filters.</p>
        )}
      </section>
    </div>
  );
};

// Component for the Authentication Screen (Login/Signup Simulation)
const AuthScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false); // To toggle between login/signup view

  // Simple alert replacement - displays message in a styled div
  const [message, setMessage] = useState('');
  const showMessage = (msg) => {
      setMessage(msg);
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      // Simulate successful login/signup
      onLogin(username.trim());
    } else {
      showMessage('Please enter a username.'); // Use custom message display
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg relative"> {/* Added relative positioning */}
         {/* Message Display Area */}
         {message && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mt-2 w-10/12">
                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-center shadow-md">
                    {message}
                 </div>
            </div>
         )}

        <h2 className="text-3xl font-bold text-center text-gray-800">
          {isSigningUp ? 'Create Account' : 'Welcome Back!'}
        </h2>
        <p className="text-center text-gray-500">
          {isSigningUp ? 'Enter a username to get started.' : 'Enter your username to track your travels.'}
          <br /> (This is a simulation using local storage)
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., intrepid_explorer"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            {isSigningUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          {isSigningUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSigningUp(!isSigningUp)}
            className="font-medium text-blue-600 hover:underline"
          >
            {isSigningUp ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};


// --- Main App Component ---
function App() {
  // State for user authentication (simulated)
  const [user, setUser] = useState(null); // null if logged out, { username: '...' } if logged in
  // State for visited places (array of country codes) - Initialize as empty array
  const [visitedPlaces, setVisitedPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // To prevent flicker on initial load
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  // Function to display error messages
   const showErrorMessage = (msg) => {
      setErrorMessage(msg);
      // Optionally clear the message after some time
      setTimeout(() => setErrorMessage(''), 5000);
   };


  // Effect to load user and visited places from local storage on mount
  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted component
    try {
      const storedUser = localStorage.getItem('travelTrackerUser');
      const storedVisited = localStorage.getItem('travelTrackerVisited');

      if (isMounted) {
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
          // Ensure storedVisited is parsed correctly, default to empty array if null or invalid
          if (storedVisited) {
             try {
                const parsedVisited = JSON.parse(storedVisited);
                // Check if it's an array, otherwise default to empty
                setVisitedPlaces(Array.isArray(parsedVisited) ? parsedVisited : []);
             } catch (parseError) {
                 console.error("Failed to parse visited places from local storage:", parseError);
                 setVisitedPlaces([]); // Default to empty array on parse error
                 localStorage.removeItem('travelTrackerVisited'); // Remove corrupted data
             }
          } else {
              setVisitedPlaces([]); // Default to empty array if nothing is stored
          }
      }

    } catch (error) {
      console.error("Failed to load data from local storage:", error);
      if (isMounted) {
          showErrorMessage("Could not load saved data. Local storage might be disabled or corrupted.");
          // Clear potentially corrupted data
          localStorage.removeItem('travelTrackerUser');
          localStorage.removeItem('travelTrackerVisited');
          setUser(null);
          setVisitedPlaces([]);
      }
    } finally {
      if (isMounted) {
          setIsLoading(false); // Finished loading attempt
      }
    }
    // Cleanup function to set isMounted to false when component unmounts
    return () => {
        isMounted = false;
    };
  }, []); // Empty dependency array means this runs only once on mount

  // Effect to save visited places to local storage whenever it changes
  useEffect(() => {
    // Don't save during initial load or if user isn't set yet
    if (!isLoading && user) {
        // Ensure visitedPlaces is an array before saving
        if (Array.isArray(visitedPlaces)) {
            try {
                 localStorage.setItem('travelTrackerVisited', JSON.stringify(visitedPlaces));
            } catch (error) {
                console.error("Failed to save visited places to local storage:", error);
                showErrorMessage("Could not save your changes. Local storage might be full or disabled.");
            }
        } else {
            console.warn("Attempted to save non-array value for visitedPlaces. Skipping save.");
            // Ensure visitedPlaces is reset to an array if it somehow became non-array
             setVisitedPlaces([]);
        }
    }
  }, [visitedPlaces, user, isLoading]); // Run when visitedPlaces, user, or isLoading changes

  // Handler for successful login/signup
  const handleLogin = (username) => {
    const newUser = { username };
    try {
        setUser(newUser);
        localStorage.setItem('travelTrackerUser', JSON.stringify(newUser));
        // Reset visited places for a new signup, or load existing if it's a login
        // Check if user already existed implicitly by checking storedVisited
        const storedVisited = localStorage.getItem('travelTrackerVisited');
         if (storedVisited) {
             try {
                 const parsedVisited = JSON.parse(storedVisited);
                 setVisitedPlaces(Array.isArray(parsedVisited) ? parsedVisited : []);
             } catch (parseError) {
                 console.error("Failed to parse visited places on login:", parseError);
                 setVisitedPlaces([]);
             }
         } else {
             setVisitedPlaces([]); // Start fresh if no previous data (likely new signup)
         }

    } catch (error) {
        console.error("Failed to save user to local storage:", error);
        showErrorMessage("Could not log you in. Local storage might be disabled.");
    }
  };

  // Handler for logout
  const handleLogout = () => {
    try {
        setUser(null);
        // Keep visited places in state but remove user from local storage
        localStorage.removeItem('travelTrackerUser');
        // Optional: Clear visited places on logout? Decided against it for now.
        // setVisitedPlaces([]);
        // localStorage.removeItem('travelTrackerVisited');
    } catch (error) {
        console.error("Failed to clear user from local storage:", error);
        showErrorMessage("Error logging out.");
    }
  };

  // Render loading state, auth screen, or dashboard
  if (isLoading) {
    // Basic loading indicator (already present in HTML, but keep for fallback)
    return <div className="flex items-center justify-center min-h-screen text-gray-500">Loading Travel Data...</div>;
  }

  return (
    <div className="App relative"> {/* Added relative positioning for error message */}
        {/* Global Error Message Display */}
        {errorMessage && (
            <div className="fixed top-4 right-4 z-50 w-auto max-w-sm">
                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-lg" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{errorMessage}</span>
                 </div>
            </div>
         )}

      {user ? (
        <Dashboard
          username={user.username}
          visitedPlaces={visitedPlaces}
          setVisitedPlaces={setVisitedPlaces}
          onLogout={handleLogout}
        />
      ) : (
        <AuthScreen onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
