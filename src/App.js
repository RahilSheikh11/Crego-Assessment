import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [connectorType, setConnectorType] = useState('and');
  const [expressions, setExpressions] = useState([
    { ruleType: 'age', operator: '>=', value: '', score: '' }
  ]);
  const [outputData, setOutputData] = useState(null);

  const handleConnectorTypeChange = (e) => {
    setConnectorType(e.target.value);
  };

  const handleExpressionChange = (index, field, value) => {
    const updatedExpressions = [...expressions];
    updatedExpressions[index][field] = value;
    setExpressions(updatedExpressions);
  };

  const handleAddExpression = () => {
    setExpressions([...expressions, { ruleType: '', operator: '', value: '', score: '' }]);
  };

  const handleSubmit = () => {
    const submittedData = {
      rules: expressions.map(({ ruleType, operator, value, score }, index) => ({
        key: `rule${index + 1}`,
        output: {
          value: parseInt(value, 10),
          operator,
          score: parseInt(score, 10),
        },
      })),
      combinator: connectorType,
    };

    setOutputData(submittedData);
  };

  return (
    <div className="container mt-4">
      <h1>Expression Engine UI</h1>

      <div className="form-group">
        <label>Connector Type:</label>
        <select
          className="form-control"
          value={connectorType}
          onChange={handleConnectorTypeChange}
        >
          <option value="and">AND</option>
          <option value="or">OR</option>
        </select>
      </div>

      <form>
        {expressions.map((expression, index) => (
          <div key={index} className="row mb-3">
            <div className="col">
              <label>Rule Type:</label>
              <select
                className="form-control"
                value={expression.ruleType}
                onChange={(e) =>
                  handleExpressionChange(index, 'ruleType', e.target.value)
                }
              >
                <option value="age">Age</option>
                <option value="creditScore">Credit Score</option>
                <option value="accountBalance">Account Balance</option>
              </select>
            </div>
            <div className="col">
              <label>Operator:</label>
              <select
                className="form-control"
                value={expression.operator}
                onChange={(e) =>
                  handleExpressionChange(index, 'operator', e.target.value)
                }
              >
                <option value=">">{'>'}</option>
                <option value="<">{'<'}</option>
                <option value=">=">{'>='}</option>
                <option value="<=">{'<='}</option>
                <option value="=">={'='}</option>
              </select>
            </div>
            <div className="col">
              <label>Value:</label>
              <input
                type="text"
                className="form-control"
                value={expression.value}
                onChange={(e) =>
                  handleExpressionChange(index, 'value', e.target.value)
                }
              />
            </div>
            <div className="col">
              <label>Score:</label>
              <input
                type="text"
                className="form-control"
                value={expression.score}
                onChange={(e) =>
                  handleExpressionChange(index, 'score', e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </form>

      <button
        type="button"
        className="btn btn-primary mt-3"
        onClick={handleAddExpression}
      >
        Add Expression
      </button>

      <button
        type="button"
        className="btn btn-success mt-3 ml-3"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {outputData && (
        <div className="mt-4">
          <h2>Output Data</h2>
          <pre>{JSON.stringify(outputData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
