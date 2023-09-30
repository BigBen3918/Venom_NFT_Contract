import { toNano, Address } from "locklift";
import nft_content from "../config/test_nft.json";

async function main() {
    const collectionArtifacts = locklift.factory.getContractArtifacts("Collection");

    // calculation of deployed Collection contract address
    const collectionAddress = await locklift.provider.getExpectedAddress(collectionArtifacts.abi, {
        tvc: collectionArtifacts.tvc,
        publicKey: "a3e02d56720f622fb338bf271c3aff532bf26c47061bfee2f19a76009346c737",
        initParams: {}, // we don't have any initParams for collection
    });
    // initialize contract object by locklift
    console.log(collectionAddress);
    const collectionInsance = locklift.factory.getDeployedContract("Collection", collectionAddress);

    const newAddress = new Address("0:f5cd38655071c65dc8570c3119d0bedad70e7109436c128dbc9de16fc80e3540");
    // call mintNft function
    // firstly get current nft id (totalSupply) for future NFT address calculating
    const { count: id } = await collectionInsance.methods.totalSupply({ answerId: 0 }).call();
    await collectionInsance.methods
        .mintNft({ json: JSON.stringify(nft_content) })
        .send({ from: newAddress, amount: toNano(0.1) });
    const { nft: nftAddress } = await collectionInsance.methods.nftAddress({ answerId: 0, id: id }).call();

    console.log(`NFT: ${nftAddress.toString()}`);
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log(e);
        process.exit(1);
    });
