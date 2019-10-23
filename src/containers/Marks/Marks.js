import React, { Component } from 'react';
import ModuleNavigation from '../../components/Navigation/ModuleNavigation/ModuleNavigation';
import Journal from '../../components/Journal/Journal';

class Marks extends Component {
  render() {
    return (
      <div>
        <ModuleNavigation />
        <Journal />
      </div>
    );
  }
}

export default Marks;
