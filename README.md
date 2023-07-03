# VEN DAO DOCUMENTATION  
This documentation covers the inspiration, purpose, and functionality of Ven DAO.  

## Quick diagram of our architecture
![IMG-20230703-WA0045](https://github.com/Ardent-Group/VENDAO-FRONTEND/assets/85754527/ec79ff97-cd9c-4380-93ae-891978695127)

### VEN DAO WEBSITE: https://vendao.vercel.app/
### VEN DAO SLIDE PRESENTATION: https://docs.google.com/presentation/d/1sR8R7T-K3qwXP6H73apUk4CMo6QIoJt6YFSkkyEwnZ8/edit?usp=sharing
### VEN DAO VIDEO DEMO: 

- [Introduction](#introduction)  
- [Inspiration](#inspiration)  
- [Tech Stack](#tech-stack)
    - [Tech Implementation](#tech-implememtation)  
- [Functionality](#functionality)  
- [Development Goals](#development-goals)  

## Introduction  
Ven DAO is a Venture Capitalist Decentralized Organization built with the aim of supporting DeFi, DAO, and NFT projects in reshaping various sectors and drive innovation across industries through the investments.  
While we acknowledge the significance of all these technologies, we built Ven DAO with our primary focus being on advancing the rapidly evolving realm of **Regenerative Finance (ReFi)** by investing in blockchain based ReFi projects.  
ReFi combines the principles of regenerative economics and sustainable finance. It aims to transform financial systems and practices by supporting the regeneration of social, ecological, and economic wellbeing. By the innovative fusion of traditional finance and decentralized finance, ReFi creates a seamless bridge between the two worlds.  

## Inspiration  
Recently, it has been clear that blockchain technology has the potential to be used to develop ReFi. The social, environmental, and economical benefits of numerous ReFi projects have already been established. For many reasons, most notably a lack of funding, there are still a lot more ReFi-based ideas that need to be developed. Same goes for DAO, NFT, and DeFi based ideas. Our drive to participate in the financial advancement of further cutting-edge concepts, particularly ReFi concepts, motivated us to develop Ven DAO. With Ven DAO, we have a venture capitalist organization that facilitates the development of more blockchain based projects that will have the most impact across various sectors, whilst being profiting for investors.

## Tech Stack  
Ven DAO was built with the following:  
[Solidity](https://soliditylang.org)  
[Hardhat](https://hardhat.org/)   
[React](https://react.dev)  
[Chakra-UI](https://chakra-ui.com/)  
[TypeScript](https://www.typescriptlang.org)  
[InterPlanetary File System (IPFS)](https://ipfs.tech)  
[AWS Amplify](https://aws.amazon.com/amplify/)  
[Covalent API](https://www.covalenthq.com/docs/api/)  
[ChainLink](https://docs.chain.link/data-feeds/price-feeds)  

### Tech Implementation  
- **Solidity**  
Solidity is the programming language used to write the smart contract code for Ven DAO. The smart contract forms the foundation of all of Ven DAO's operations. Ven DAO smart contract can be found [here](https://github.com/Ardent-Group/VENDAO/tree/main/contracts).  

- **React**  
React is the JavaScript framework used to write the frontend code for Ven DAO. Users can interact with Ven DAO through the frontend interface. The frontend code can be found [here](https://github.com/Ardent-Group/VENDAO-FRONTEND).  

- **Chakra-UI**  
Ven DAO front end was designed using the CSS  framework, Chakra-ui.

- **TypeScript**  
Along with React, TypeScript was also used in the front-end development of Ven DAO.  

- **IPFS**  
Project information (images, documents, videos) sent along with proposals by those seeking funding on Ven DAO are stored on IPFS.  

- **Covalent API**  
The covalent API is used to get the latest transactions performed by members of Ven DAO.  

- **ChainLink**  
ChainLink Price Feeds is used to get current price data of cryptocurrencies used on Ven DAO. Along with ChainLink price feed, price information is also gotten from **[SpookySwap](https://spooky.fi/#/swap)**, a Decentralized Exchange on Fantom blockchain. Using the SpookySwap exchange function, a crypto exchange can happen on Ven DAO. 

## Functionality  
In this section, we will be going through the various features and functions on Ven DAO.  

- **JOINING VEN DAO**  
Ven DAO is open to all interested investors who fulfill the requirements to join Ven DAO. The major requirement set is having the stipulated amount of [FTM](https://coinmarketcap.com/currencies/fantom/) required to be deposited upon joining the DAO. On joining the DAO, an `accessibility NFT` is minted to the new member's address and the address is awarded the `Investor` role.  The Investor role allows members the right to vote and invest in projects.  

- **MAKING PROPOSALS**  
Making proposals to Ven DAO involves submitting details of the project, contact email, the amount needed to fund the project, and a document stating the equity offering to investors. 
On submitting the proposal to the DAO, investors and `Nominated Admins` will review the documents submitted to evaluate the viability of the project. Investing in a project will only happen when investors are satisfied with the proposal, project viability, and equity offering.
A proposal is allowed once a week to prevent overpopulating the proposal list. 

- **ACCESS CONTROL**  
Access to functions on the DAO is limited to `roles` assigned to each member. There are three (3) roles on Ven DAO:  
    `INVESTOR`  
    `NOMINATED ADMIN`  
    `ADMIN`  

    1. Investor:  
    The Investor role is assigned to every member on joining the DAO. This role allows members to invest in proposed projects that pass viability evaluation, claim yields on investments, vote, and be voted for.  

    2. Nominated Admin:  
    Nominated Admins are voted on by other DAO members to review proposals that are presented to the DAO. Following the successful funding of approved projects, the nominated admins will earn incentives.
  

    3. Admin:  
    Admins are members of the DAO tasked with overseeing the running and activities of the DAO.  

- **VEN DAO VOTING**  
When newly Nominated Admins are to be elected, members of the DAO will be required to vote in preferred members to handle the responsibilities of that position. There can only be 10 members contesting and the four with the highest votes will be assigned the role.  

## Development Goals  
We are prepared to drive Ven DAO through the process leading up to an official launch, taking into account the necessity to get new projects on board and develop the blockchain ecosystem as well as our dedication to this direction. Building communities, launching on testnet, receiving community feedback, implementing feedback, and auditing smart contracts are a few of those things involved in getting Ven fully launched.  
We are sure that Ven DAO will be the venture capital platform that makes a significant contribution to the development of the DeFi, ReFi, NFT, and DAO worlds and see a greater impact.
