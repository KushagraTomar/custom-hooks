import { useState } from 'react'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'


function App() {

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div>
        <div>
            <div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div>
                        <InputBox
                            label="From"
                            amount={amount}
                            onAmountChange={(amount) => setAmount(amount)}
                            selectCurrency={from}
                            onCurrencyChange={(currency) => setFrom(currency)}
                            currencyOptions={options}
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div>
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            selectCurrency={to}
                            onCurrencyChange={(currency) => setTo(currency)}
                            currencyOptions={options}
                            amountDisable
                        />
                    </div>
                    <button type="submit">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App