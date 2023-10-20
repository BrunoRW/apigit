import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [avatar, setAvatar] = useState("No data");
  const [name, setName] = useState("No data");
  const [bio, setBio] = useState("No data");
  const [username, setUsername] = useState("No data");
  const [qntRepo, setQntRepo] = useState(0);
  const [qntFollowers, setQntFollowers] = useState(0);
  const [qntFollowing, setQntFollowing] = useState(0);
  const [links, setLinks] = useState([]);

  const getRepos = (e) => {
    fetch(e)
      .then((e) => e.json())
      .then((e) => {
        setLinks(e);
      });
  };

  const getUser = (e) => {
    fetch(`https://api.github.com/users/${e}`)
      .then((e) => e.json())
      .then((e) => {
        setAvatar(e.avatar_url);
        setName(e.name);
        setBio(e.bio);
        setUsername(e.login);
        setQntRepo(e.public_repos);
        setQntFollowers(e.followers);
        setQntFollowing(e.following);
        getRepos(e.repos_url);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        
        <img src={avatar} className="App-logo" alt="logo" />
        <p>{name}</p>
        <p>{bio}</p>
        <p>{username}</p>
        <p>Qnt repo: {qntRepo}</p>
        <p>followers: {qntFollowers}</p>
        <p>following: {qntFollowing}</p>
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <a href={link.html_url}>{link.name}</a>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
