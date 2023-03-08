import { useState, useEffect } from "react";
import "./App.css";
import FormStyle from "./components/FormStyled.jsx";

function App() {
  const API = "http://localhost:5000";
  const [price, setPrice] = useState("");
  const [segmentation, setSegmentation] = useState("");
  const [conversion, setConversion] = useState("");
  const [name_advertiser, setAdvertiser] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const res = await fetch(API + "/")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));

      setLoading(false);
      setCampaigns(res);
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const campaign = {
      name_advertiser,
      segmentation,
      price,
      conversion,
    };

    //Envio para api
    await fetch(API + "/campaign", {
      method: "POST",
      body: JSON.stringify(campaign),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setCampaigns((prevState) => [...prevState, campaign]);
    setPrice("");
    setSegmentation("");
    setConversion("");
  };

  const handleEdit = async (campaign) => {
    const data = await fetch(API + "/" + campaign.id, {
      method: "PUT",
      body: JSON.stringify(campaign),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setCampaigns((prevState) =>
      prevState.map((cam) => (cam.id === data.id ? (cam = data) : cam))
    );
  };

  const handleDelete = async (id) => {
    await fetch(API + "/" + id, {
      method: "DELETE",
    });

    setCampaigns((prevState) =>
      prevState.filter((campaign) => campaign.id !== id)
    );
  };

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div className="App">
      <div className="campaign-header">
        <h1>Campanhas</h1>
      </div>
      <div className="form-campaign">
        <h2>Insira sua campanha:</h2>
        <FormStyle>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="adverstiser">Lance</label>
              <input
                type="text"
                name="adverstiser"
                placeholder="Digite o nome do anuciante"
                onChange={(e) => setAdvertiser(e.target.value)}
                value={name_advertiser || ""}
                required
              />
              <label htmlFor="price">Lance</label>
              <input
                type="text"
                name="price"
                placeholder="Digite o lance"
                onChange={(e) => setPrice(e.target.value)}
                value={price || ""}
                required
              />
              <label htmlFor="segmentation">Segmento</label>
              <input
                type="text"
                name="segmentation"
                placeholder="Digite o segmento"
                onChange={(e) => setSegmentation(e.target.value)}
                value={segmentation || ""}
                required
              />
              <label htmlFor="conversion">Conversão</label>
              <input
                type="text"
                name="conversion"
                placeholder="Digite a conversão"
                onChange={(e) => setConversion(e.target.value)}
                value={conversion || ""}
                required
              />
              <input type="submit" value="Criar campanha" />
            </div>
          </form>
        </FormStyle>
      </div>
      <div className="list-campaigns">
        {campaigns.length === 0 && <p>Não há campanhas!</p>}
        {campaigns.map((campaign) => (
          <div className="campaign" key={campaign.id}>
            <p>Anuciante: {campaign.name_advertiser}</p>
            <p>Preço: {campaign.price}</p>
            <p>Segmentação: {campaign.segmentation}</p>
            <p>Conversão: {campaign.conversion}</p>
            <button
              type="text"
              name="edit"
              onClick={() => handleEdit(campaign)}
            >
              editar
            </button>
            <button
              type="text"
              name="excluir"
              onClick={() => handleDelete(campaign.id)}
            >
              excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
