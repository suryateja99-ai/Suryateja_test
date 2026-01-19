import "./Body.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function Body() {
  const navigate = useNavigate();

  const { isLoggedIn, username } = useAuth();

  const displayName = username ? username.split("@")[0] : "";

  const sports = [
    {
      name: "Cricket",
      img: "https://media.istockphoto.com/id/936417006/vector/cricket-stadium-vector-wallpaper.jpg?s=612x612&w=0&k=20&c=uig_bpfwpVGd4dZl2VypwcfA1Lx7W4kLr-6A00NIw1M=",
    },
    {
      name: "Badminton",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUa0F2K-ZXX-PSt_KYZ-0hMAzHzdAl-PGqlg&s",
    },
    {
      name: "Football",
      img: "https://t4.ftcdn.net/jpg/08/34/80/25/360_F_834802549_2WrwxrHZYjMw4JZLD5AiTS4wP1YL2ejp.jpg",
    },
    {
      name: "Tennis",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkquLlvefIUSl9ZTPJooQzaA9LHN8fpXRJmA&s",
    },
    {
      name: "Basketball",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZAHVIpNFAgaIdHdYlYDbwJmgDrp7HAQdaZA&s",
    },
  ];

  const handleSubmit = (sportName) => {
    navigate("/booking", {
      state: {
        sport: sportName,
        name: displayName,
      },
    });
  };

  const toLogin = () => {
    navigate("/login");
  };

  return (
    <div className="sports">
      {isLoggedIn && displayName && (
        <h2>Welcome, {displayName} 👋</h2>
      )}

      <div className="showing">
        {sports.map((sp) => (
          <div key={sp.name}>
            <img src={sp.img} alt={sp.name} />
            <h3>{sp.name}</h3>

            {isLoggedIn ? (
              <button onClick={() => handleSubmit(sp.name)}>
                Select
              </button>
            ) : (
              <button onClick={toLogin}>
                Login to Book
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Body;
