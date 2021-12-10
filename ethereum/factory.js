import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x62387768a2d3C5f3826ba3422A053D72BF7d5663'
);

export default instance;
