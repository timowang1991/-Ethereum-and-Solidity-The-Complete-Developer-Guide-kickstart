import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xaF8aa6425Cb0a3a4D3363cC8114E60014249307f'
);

export default instance;
