"use strict";
class sortAlgorithms {
  constructor(time) {
    this.list = document.querySelectorAll(".cell");
    this.size = this.list.length;
    this.time = time;
    this.help = new Helper(this.time, this.list);
  }

  // Helper function to update the value display of graph bars
  updateValueDisplay = (index, value) => {
    this.list[index].innerText = value; // Set the value as the inner text of the graph bar
  };

  // BUBBLE SORT
  BubbleSort = async () => {
    for (let i = 0; i < this.size - 1; ++i) {
      for (let j = 0; j < this.size - i - 1; ++j) {
        await this.help.mark(j);
        await this.help.mark(j + 1);
        if (await this.help.compare(j, j + 1)) {
          await this.help.swap(j, j + 1);
          // Update value display after swapping
          this.updateValueDisplay(j, Number(this.list[j].getAttribute("value")));
          this.updateValueDisplay(j + 1, Number(this.list[j + 1].getAttribute("value")));
        }
        await this.help.unmark(j);
        await this.help.unmark(j + 1);
      }
      this.list[this.size - i - 1].setAttribute("class", "cell done");
    }
    this.list[0].setAttribute("class", "cell done");
  };

  // INSERTION SORT
  InsertionSort = async () => {
    for (let i = 0; i < this.size - 1; ++i) {
      let j = i;
      while (j >= 0 && (await this.help.compare(j, j + 1))) {
        await this.help.mark(j);
        await this.help.mark(j + 1);
        await this.help.pause();
        await this.help.swap(j, j + 1);
        // Update value display after swapping
        this.updateValueDisplay(j, Number(this.list[j].getAttribute("value")));
        this.updateValueDisplay(j + 1, Number(this.list[j + 1].getAttribute("value")));
        await this.help.unmark(j);
        await this.help.unmark(j + 1);
        j -= 1;
      }
    }
    for (let counter = 0; counter < this.size; ++counter) {
      this.list[counter].setAttribute("class", "cell done");
    }
  };

  // SELECTION SORT
  SelectionSort = async () => {
    for (let i = 0; i < this.size; ++i) {
      let minIndex = i;
      for (let j = i; j < this.size; ++j) {
        await this.help.markSpl(minIndex);
        await this.help.mark(j);
        if (await this.help.compare(minIndex, j)) {
          await this.help.unmark(minIndex);
          minIndex = j;
        }
        await this.help.unmark(j);
        await this.help.markSpl(minIndex);
      }
      await this.help.mark(minIndex);
      await this.help.mark(i);
      await this.help.pause();
      await this.help.swap(minIndex, i);
      // Update value display after swapping
      this.updateValueDisplay(i, Number(this.list[i].getAttribute("value")));
      this.updateValueDisplay(minIndex, Number(this.list[minIndex].getAttribute("value")));
      await this.help.unmark(minIndex);
      this.list[i].setAttribute("class", "cell done");
    }
  };

  // MERGE SORT
  MergeSort = async () => {
    await this.MergeDivider(0, this.size - 1);
    for (let counter = 0; counter < this.size; ++counter) {
      this.list[counter].setAttribute("class", "cell done");
    }
  };

  MergeDivider = async (start, end) => {
    if (start < end) {
      let mid = start + Math.floor((end - start) / 2);
      await this.MergeDivider(start, mid);
      await this.MergeDivider(mid + 1, end);
      await this.Merge(start, mid, end);
    }
  };

  Merge = async (start, mid, end) => {
    let newList = new Array();
    let frontcounter = start;
    let midcounter = mid + 1;

    while (frontcounter <= mid && midcounter <= end) {
      let fvalue = Number(this.list[frontcounter].getAttribute("value"));
      let svalue = Number(this.list[midcounter].getAttribute("value"));
      if (fvalue >= svalue) {
        newList.push(svalue);
        ++midcounter;
      } else {
        newList.push(fvalue);
        ++frontcounter;
      }
    }
    while (frontcounter <= mid) {
      newList.push(Number(this.list[frontcounter].getAttribute("value")));
      ++frontcounter;
    }
    while (midcounter <= end) {
      newList.push(Number(this.list[midcounter].getAttribute("value")));
      ++midcounter;
    }

    for (let c = start; c <= end; ++c) {
      this.list[c].setAttribute("class", "cell current");
    }
    for (
      let c = start, point = 0;
      c <= end && point < newList.length;
      ++c,)
