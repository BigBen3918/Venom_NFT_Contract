import { expect } from "chai";
import { Signer } from "locklift";
import collection_content from "../config/collection.json";

let signer: Signer;

describe("Test Collection contract", async function () {
    before(async () => {
        signer = (await locklift.keystore.getSigner("0"))!;
    });
    describe("Contracts", async function () {
        it("Load contract factory", async function () {
            const sampleData = locklift.factory.getContractArtifacts("Nft");

            expect(sampleData.code).not.to.equal(undefined, "Code should be available");
            expect(sampleData.abi).not.to.equal(undefined, "ABI should be available");
            expect(sampleData.tvc).not.to.equal(undefined, "tvc should be available");
        });

        it("Deploy contract", async function () {
            const nftArtifacts = locklift.factory.getContractArtifacts("Nft");
            const indexArtifacts = locklift.factory.getContractArtifacts("Index");
            const indexBasisArtifacts = locklift.factory.getContractArtifacts("IndexBasis");
            const { contract } = await locklift.factory.deployContract({
                contract: "Collection",
                publicKey: signer.publicKey,
                initParams: {
                    _nonce: locklift.utils.getRandomNonce(),
                },
                constructorParams: {
                    codeNft: nftArtifacts.code,
                    codeIndex: indexArtifacts.code,
                    codeIndexBasis: indexBasisArtifacts.code,
                    json: JSON.stringify(collection_content),
                },
                value: locklift.utils.toNano(2),
            });

            console.log(contract.address);
        });
    });
});
