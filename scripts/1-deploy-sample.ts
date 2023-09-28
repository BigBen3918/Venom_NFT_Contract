import collection_content from "../config/collection.json";

async function main() {
    const signer = (await locklift.keystore.getSigner("0"))!;
    console.log(await locklift.keystore.getSigner("0"));
    const nftArtifacts = locklift.factory.getContractArtifacts("Nft");
    const indexArtifacts = locklift.factory.getContractArtifacts("Index");
    const indexBasisArtifacts = locklift.factory.getContractArtifacts("IndexBasis");
    const { contract: sample, tx } = await locklift.factory.deployContract({
        contract: "Collection",
        publicKey: signer?.publicKey as string,
        initParams: {
            nonce_: locklift.utils.getRandomNonce(),
        },
        constructorParams: {
            codeNft: nftArtifacts.code,
            codeIndex: indexArtifacts.code,
            codeIndexBasis: indexBasisArtifacts.code,
            json: JSON.stringify(collection_content),
        },
        value: locklift.utils.toNano(4),
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
