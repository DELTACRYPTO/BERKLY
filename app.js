// Vérifier si MetaMask est installé
if (typeof window.ethereum === 'undefined') {
    alert('Veuillez installer MetaMask pour interagir avec cette page.');
}

// Fonction principale pour déployer le contrat
async function deployContract() {
    try {
        // Demander la connexion de l'utilisateur à MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Initialiser le provider ethers.js
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Contrat Solidity simple pour le stockage
        const contractABI = [
            "function set(uint256 _data) public",
            "function get() public view returns (uint256)"
        ];

        const contractBytecode = "608060405234801561001057600080fd5b506101d8806100206000396000f3fe6080604052600436106100295760003560e01c806360fe47b11461002e5780636d4ce63c1461004c575b600080fd5b61003661006a565b60405161004391906100f3565b60405180910390f35b6100546100c0565b60405161006191906100f3565b60405180910390f35b60008054905090565b60008054905090565b60005481565b6000813590506100d58161014a565b92915050565b6000602082840312156100f1576100f0610145565b5b60006100ff848285016100c6565b91505092915050565b6101118161011c565b82525050565b600060208201905061012c6000830184610108565b92915050565b60008115159050919050565b600060ff82169050919050565b6101588161011c565b811461016357600080fd5b5056fea2646970667358221220c6652254d91f0ff070f2352df5fae51a1f0ef5f70d11b3a76cfae787d0607f1764736f6c634300080b0033";

        // Créer un contrat via ethers.js
        const factory = new ethers.ContractFactory(contractABI, contractBytecode, signer);

        console.log("⏳ Déploiement du contrat en cours...");

        const contract = await factory.deploy(); // Déployer le contrat
        await contract.deployTransaction.wait(); // Attendre la confirmation du déploiement

        console.log(`✅ Contrat déployé à l'adresse : ${contract.address}`);
        alert(`Contrat déployé à l'adresse : ${contract.address}`);
    } catch (error) {
        console.error("❌ Erreur lors du déploiement :", error);
        alert("Erreur lors du déploiement du contrat.");
    }
}

// Ajouter l'écouteur d'événement pour le bouton
document.getElementById('deployButton').addEventListener('click', deployContract);
