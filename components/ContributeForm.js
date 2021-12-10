import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();
        const { address } = this.props;
        const { value } = this.state;
        const campaign = Campaign(address);

        this.setState({ loading: true, errorMessage: '' })
        
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            });
            Router.replaceRoute(`/campaigns/${address}`);
        } catch (error) {
            this.setState({ errorMessage: error.message })
        }

        this.setState({ loading: false });
    }

    render() {
        const { value, errorMessage, loading } = this.state;

        return (
            <Form onSubmit={this.onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Amount to contribute</label>
                    <Input
                        label="ether"
                        labelPosition="right"
                        value={value}
                        onChange={event => this.setState({ value: event.target.value })}
                    />
                </Form.Field>
                <Message error header="Oops!" content={errorMessage} />
                <Button loading={loading} primary>Contribute!</Button>
            </Form>
        );
    }
}

export default ContributeForm;
