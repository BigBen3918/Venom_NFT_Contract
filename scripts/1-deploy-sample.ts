import collection_content from "../config/collection.json";

async function main() {
    const nftArtifacts = locklift.factory.getContractArtifacts("Nft");
    const indexArtifacts = locklift.factory.getContractArtifacts("Index");
    const indexBasisArtifacts = locklift.factory.getContractArtifacts("IndexBasis");
    const { contract: sample, tx } = await locklift.factory.deployContract({
        contract: "Collection",
        publicKey: "a3e02d56720f622fb338bf271c3aff532bf26c47061bfee2f19a76009346c737",
        initParams: {
            nonce_: locklift.utils.getRandomNonce(),
        },
        constructorParams: {
            codeNft: nftArtifacts.code,
            codeIndex: indexArtifacts.code,
            codeIndexBasis: indexBasisArtifacts.code,
            json: JSON.stringify(collection_content),
        },
        value: locklift.utils.toNano(0),
    });

    console.log("tx: ", tx.transaction.totalFees);

    console.log(`Collection deployed at: ${sample.address.toString()}`);
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log(e);
        process.exit(1);
    });
