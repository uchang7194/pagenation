(function(global){
  'use strict';

  console.log(global.Pagenation);
  if( global.Pagenation !== undefined ) {
    throw 'Already exist pagenation';
  }


  class Pagenation {
    // utils
    constructor(target, new_options) {
      
    }
    this.utils = () => {
      
      const extend = (new_options) => {
        let crt_options = this.options;
        
        if( Object.prototype.toString.call({}).slice(8, -1).toLowerCase() !== 'object' ) {
          throw `${new_options} is not object`;
        }

        for(const prop in new_options) {
          if( crt_options.hasOwnProperty(prop) ) {
            crt_options[prop] = new_options[prop];
          } else {
            throw `${prop} is not exist`;
          }
        }
      };

      const typeCheck = (target, type) => {
        return Object.prototype.toString.call(target).splice(8, -1).toLowerCase() === type ? true : false;
      }

      const isElement = (target) => {
        return (target.nodeType === 1) ? true : false;
      }

      const getDomElement = (target) => {

        let targetObj = null;
        
        if( !typeCheck(target, 'string') ) {
          throw `${target} is not String`;
        }
        
        targetObj = document.querySelector(target);

        if( targetObj === null ) {
          throw `Not found ${target}`;
        }

        return targetObj;
      }

      const appendChild = (parent, child) => {

        if( !isElement(parent)) {
          throw `${parent} is not ElementNode`;
        }
        if( !isElement(child)) {
          throw `${child} is not ElementNode`;
        }

        parent.appendChild(child);
      };

      const removeChild = (parent, child) => {
        if( !isElement(parent)) {
          throw `${parent} is not ElementNode`;
        }
        if( !isElement(child)) {
          throw `${child} is not ElementNode`;
        }

        parent.removeChild(child);
      }

      return {
        extend,
        isElement,
        getDomElement,
        appendChild,
        removeChild
      }
    }
    
    /**
     *
     * values
     *
     */
    
    // options
    this.options = {
      totalPage: 5,
      maxView: 10,
      prev: 'prev',
      next: 'next',
      theadData: [],
      tbodyData: []
    };
    // local value
    this.targetObj = null;

    this.table = null;
    this.tHead = null;
    this.tBody = null;

    
    this.init = () => {

      const utils = this.utils;

      // 1. extends options
      utils.extend(new_options);

      // 2. target
      if( utils.isElement(target) ) {
        this.targetObj = target;
      } else {
        this.targetObj = utils.getDomElement(target);
      }

      // 3. render table
      this.renderTable();
      console.log(this.targetObj);
    }

    this.renderTable = () => {

      /*
        table
          thead
            tr
              th
          tbody
            tr
              td   
      */

      const options = this.options;

      let table = document.createElement('table');

      utils.appendChild(this.targetObj, table);
      this.table = table;

      this.renderTableHead();
      this.renderTableBody();
    }
    this.renderTableHead = () => {
      
      let thead = document.createElement('thead');
      
      // dynamic append dom

      if( this.tHead === null ) {
        utils.appendChild(this.table, thead);
      } else {
        utils.removeChild(this.table, this.tHead);
        utils.appendChild(this.table, thead);
      }

      this.tHead = thead;
    }
    this.renderTableBody = () => {
      let tbody = document.createElement('tbody');

      // dynamic append dom

      if( this.tBody === null ) {
        utils.appendChild(this.table, tbody);
      } else {
        utils.removeChild(this.table, this.tBody);
        utils.appendChild(this.table, tbody);
      }
      this.tBody = tbody;
    }

    this.init();
  }

  global.Pagenation = Pagenation;
}(window));