import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { NmMapService, Room } from './../nm-map.service';

@Component({
  selector: 'app-nm-map',
  standalone: true,
  imports: [],
  templateUrl: './nm-map.component.html',
  styleUrl: './nm-map.component.css'
})
export class NmMapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) private mapContainer!: ElementRef;
  

  constructor(private nmMapService: NmMapService) {}

  

  ngOnInit(): void {
    this.nmMapService.getRooms().subscribe((rooms) => {
      this.createMap(rooms);
    });
  }

  createMap(rooms: Room[]): void {
    const element = this.mapContainer.nativeElement;

    // Create the SVG container
    const svg = d3.select(element)
      .append('svg')
      .attr('width', 600)
      .attr('height', 600);

    // Create a group (g) element to handle zoom and pan
    const mapGroup = svg.append('g');

    // Define zoom behavior
    const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 5])  // Set zoom limits (optional)
      .on('zoom', (event) => {
        mapGroup.attr('transform', event.transform);  // Apply zoom transform to the group
      });

    // Apply zoom behavior to the SVG element
    svg.call(zoomBehavior);

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = 600 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Get min/max coordinates for dynamic scaling
    const xExtent = d3.extent(rooms, d => d.x) as [number,number];
    const yExtent = d3.extent(rooms, d => d.y) as [number,number];

    // Create scales based on room coordinates
    const xScale = d3.scaleLinear().domain(xExtent).range([margin.left, width - margin.right]);
    const yScale = d3.scaleLinear().domain(yExtent).range([margin.top, height - margin.bottom]);

    // Draw paths (connections)
    rooms.forEach((room) => {
      Object.keys(room.exits).forEach((exit) => {
        const targetRoom = rooms.find((r) => r.id === room.exits[exit]);
        if (targetRoom) {
          mapGroup.append('line')
            .attr('x1', xScale(room.x))
            .attr('y1', yScale(room.y))
            .attr('x2', xScale(targetRoom.x))
            .attr('y2', yScale(targetRoom.y))
            .attr('stroke', 'gray')
            .attr('stroke-width', 2);
        }
      });
    });

    // Draw rooms (nodes)
    mapGroup.selectAll('circle')
      .data(rooms)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 20)
      .attr('fill', 'lightblue')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .on('mouseover', (event, d) => this.showTooltip(event, d))  // Mouseover for tooltips
      .on('mouseout', this.hideTooltip)  // Mouseout to hide tooltips
      .on('click', (event, d) => this.onRoomClick(d));  // Click event

    // Add room names
    mapGroup.selectAll('text')
      .data(rooms)
      .enter()
      .append('text')
      .attr('x', (d) => xScale(d.x) - 10)
      .attr('y', (d) => yScale(d.y) - 25)
      .text((d) => d.name);

  }

    // Tooltip div
    tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('border', '1px solid black')
      .style('padding', '5px');

    // Show tooltip on hover
    showTooltip(event:any, room:Room):void {
      this.tooltip.html(`Room: ${room.name}`)
        .style('visibility', 'visible')
        .style('top', `${event.pageY - 10}px`)
        .style('left', `${event.pageX + 10}px`);
    };

    // Hide tooltip on mouseout
    hideTooltip():void{
      this.tooltip.style('visibility', 'hidden');
    };

    // Room click action (example)
    onRoomClick(room:Room):void {
      alert(`You clicked on room: ${room.name} \n ${room?.description}`);
    };
  
}
