import React, { Component } from 'react';
import { FlatList, View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import { TransactionItem, Separator } from '../components/ListItem';
import { Container } from '../components/Container';
import recentTransactionsRec from '../data/recentTransactionsRec';
import recentTransactionsSent from '../data/recentTransactionsSent';

// REDUX
// import { connect } from 'react-redux';
// import { changeBaseCurrency, changeQuoteCurrency } from '../actions/currencies';

const recArr = recentTransactionsRec.data.txs.slice();
const sentArr = recentTransactionsSent.data.txs.slice();

class Transactions extends Component {

	static propTypes = {
		onPress: PropTypes.func,
	}

	addSent = list => {
		let result = list.map(item => {
			let el = Object.assign({}, item);
			el.sentOrRec = 'sent';
			return el;
		})
		return result;
	}

	addRec = list => {
		let result = list.map(item => {
			let el = Object.assign({}, item);
			el.sentOrRec = 'received';
			return el;
		})
		return result;
	}

	sortData = (listOne, listTwo) => {
		let updatedListOne = this.addSent(listOne);
		let updatedListTwo = this.addRec(listTwo);
		return updatedListOne.concat(updatedListTwo).sort((a, b) => b.time - a.time);
	}

	handlePress = (item) => {
		console.log(`transfer to screen: ${item}`);
	}

// RENDER ========================

	render() {

		return (
			<Container>
				<StatusBar translucent={false} barStyle='light-content' />
				<FlatList
					style={{marginTop: 10}}
					data={this.sortData(recArr, sentArr)}
					renderItem={({ item }) => (
						<TransactionItem
							sentOrRec={item.sentOrRec}
							amount={item.amounts_received ? item.amounts_received[0].amount : item.total_amount_sent}
							sender={item.senders[0]}
							confidence={item.confidence}
							confirmations={item.confirmations}
							onPress={() => this.handlePress(item)}
						/>
					)}
					keyExtractor={item => item.txid}
					ItemSeparatorComponent={Separator}
				/>
			</Container>
		)
	}
}

export default Transactions;

// const mapStateToProps = state => {
// 	return {
// 		baseCurrency: state.currencies.baseCurrency,
// 		quoteCurrency: state.currencies.quoteCurrency,
// 		primaryColor: state.theme.primaryColor,
// 	}
// }
//
// export default connect(mapStateToProps)(CurrencyList);
