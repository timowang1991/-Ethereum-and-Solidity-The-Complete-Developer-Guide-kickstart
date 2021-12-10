import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

class RequestNew extends Component {
    state = {
        description: '',
        value: '',
        recipient: '',
        loading: false,
        errorMessage: ''
    }

    static async getInitialProps(props) {
        const { address } = props.query;
        return {
            address
        };
    }

    onSubmit = async (event) => {
        event.preventDefault();
        
        const { address } = this.props;
        const { description, value, recipient } = this.state;
        const campaign = Campaign(address);

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                description, web3.utils.toWei(value, 'ether'), recipient
            ).send({
                from: accounts[0]
            });
            Router.pushRoute(`/campaigns/${address}/requests`);
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }
        this.setState({ loading: false });
    }

    render() {
        const { address } = this.props;
        const { description, value, recipient, loading, errorMessage } = this.state

        return (
            <Layout>
                <Link route={`/campaigns/${address}/requests`}>
                    <a>Back</a>
                </Link>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={description}
                            onChange={event => this.setState({ description: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input
                            value={value}
                            onChange={event => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient Address</label>
                        <Input
                            value={recipient}
                            onChange={event => this.setState({ recipient: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={errorMessage} />
                    <Button primary loading={loading}>Create!</Button>
                </Form>
            </Layout>
        );
    }
}

export default RequestNew;
