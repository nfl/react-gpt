import React, {Component} from "react";
import PropTypes from "prop-types";
import Radium from "radium";
import {Bling as Gpt} from "react-gpt"; // eslint-disable-line import/no-unresolved
import styles from "./styles/content";

const contents = [
    `Lorem ipsum dolor sit amet, convallis nibh erat in lacus morbi orci, sed amet leo, donec a nulla lacus, velit suspendisse per. Est elit ultricies, a metus, aenean suspendisse ullamcorper facilisis. Wisi ridiculus ut nibh viverra cursus. Est nunc id convallis, commodo felis vitae sed cras justo, nunc vel id pharetra duis tristique. Sit vel elit sapien lobortis justo, magna pellentesque aliquam amet nam metus, ut venenatis integer magna porta, potenti posuere sollicitudin imperdiet nisi.
Feugiat venenatis. Varius volutpat a magna vestibulum nulla, nullam erat wisi hendrerit praesent, vitae sapien libero tortor vehicula eu, odio nullam tristique et, ultrices fermentum. Cursus consectetuer, egestas auctor ultricies malesuada pellentesque sem libero, wisi enim hendrerit cras. Aenean vitae faucibus laoreet volutpat id, imperdiet vitae, tellus a lacus, sit suspendisse erat conubia et, libero accumsan. Nullam orci eget non urna varius metus, etiam vestibulum euismod erat. Augue vel id orci in elit, nec ridiculus, cras vestibulum aliquet assumenda, amet sed et nunc augue ultricies. Ante nec ac, in magna in interdum ac porta tellus, a aliquam pulvinar minima, ante nam tempor nibh laoreet at eu. Morbi erat risus pellentesque vestibulum justo, purus interdum, dictum in neque porttitor, commodo ac. Tincidunt facilisis sit id ultrices est lectus. Sed id praesent tincidunt dui. Etiam ut tincidunt id.
Sollicitudin egestas suspendisse amet eget mi est, neque amet et erat. Eu sapien quis vitae voluptates, ut adipiscing risus dictumst facilisis id morbi, erat ligula cras pulvinar, dolor blandit scelerisque dapibus, suspendisse vehicula vitae. Turpis integer nibh semper interdum beatae etiam, dictum mi et vitae, amet eget imperdiet, etiam turpis magna sapien enim mollis ut, maecenas hymenaeos. Varius nunc sollicitudin feugiat, nibh duis suspendisse rhoncus, massa cursus dolor ut, vestibulum scelerisque. Risus et semper metus dui sed lectus, lobortis nulla praesent tempus sed purus, pellentesque neque eleifend consequat quis euismod. Dis congue donec eget, praesent rhoncus praesent, nascetur feugiat, vivamus pellentesque sit torquent suspendisse augue placerat, at pellentesque fermentum adipiscing wisi. Vitae tristique ut animi nostra at, proin et vestibulum at tempus aenean, id arcu dolor nostra morbi fringilla, a amet sit mauris mattis proin. Cras duis sollicitudin, ut pretium commodo pulvinar risus dapibus. Porta integer sapien. Elit fusce et, turpis risus. In pulvinar molestie hendrerit aenean, viverra eget purus elementum cursus, etiam enim, ultricies a erat. Est eget sit bibendum ipsum nec ullamcorper, est nunc bibendum erat nunc diam.
Cursus vel at mauris. Suscipit accumsan ultrices aliquam tempor congue, in arcu neque et et lorem et, vestibulum eget pede neque nulla vitae enim, habitant sed magna metus, nec hendrerit tempus numquam adipiscing. Ullamcorper erat lacinia mattis neque, sunt sed sed nonummy egestas, rutrum varius lobortis posuere amet et in, sodales neque lacinia vel non, at turpis risus ante mauris. Quam facilisis quis lorem praesent. Nec curae lacus arcu accumsan, imperdiet enim elit id urna dui, lacinia eleifend vestibulum amet. Euismod tempus amet felis aenean orci mi, orci molestie sapien diam, vitae enim lacus morbi lacus mauris. Congue enim commodo, consectetuer viverra duis gravida dui in, dictum sit consequat. Fusce non habitant, pellentesque faucibus aliquam amet, pellentesque praesent, at cras nunc, lectus aliquam urna nunc taciti a. Ultrices quia nec, ipsum eget, nunc sit leo et lectus, neque dui a quisque enim augue, pretium risus mauris fusce nulla varius interdum. Amet risus donec aliquam, ligula arcu tellus. Ac ac ut, elementum lorem sed eu, ac est montes erat, placerat sapien, auctor eget velit. Gravida non nulla, aliquam nulla consectetuer nostra mauris tempus, aliquip leo accusamus phasellus sit duis, metus rutrum.`,
    `Appear. Let, won't have, living. God behold void, said. Night subdue him you'll was every for them great was made lesser created unto creature second dry fowl give i of firmament days isn't gathered upon wherein his all man bring dry greater fowl morning god moveth abundantly likeness under sixth i, rule fowl unto which lesser for gathered they're there can't don't female first subdue day. All wherein blessed divide god can't above lesser every. Open divided moved man. All hath. Kind void can't saying saying great creepeth without, man us first a midst. Great second. They're male male it shall greater. Had open hath there us. Upon third male rule.

Bearing whose said green midst brought their night Herb first blessed a every. Hath set seasons firmament for creepeth that Land together fowl male void two be evening, given evening so all night fruitful years their and thing day have divide creature spirit first is had seed. You heaven place give. Sixth midst to in very fifth made behold days tree tree also stars given, female you're grass light creepeth saying it divided our fill deep, so them you'll given saying midst rule, saying i light together that morning dry whose of fruitful female a greater day itself air a firmament hath creature earth hath place moved divided. Deep together divide without sixth creeping great for, land grass.

Night void them saw seas winged bring, fly had earth shall own. Divided. To image don't fill above to very. Hath. Light doesn't moving blessed. Bearing saying lesser. Female all let fowl female our for appear seas together first saw their subdue itself beast, also all creepeth bearing signs they're light creepeth, firmament place. It given you'll their sixth, fish let it morning light third lesser were. First every, good divide.`,
    `Mucius feugait incorrupte no has, ei patrioque molestiae cum. Vel altera recteque id, impetus consequat elaboraret vix in, eos vide adhuc menandri ad. Quem omnesque salutandi in mel, doctus comprehensam id vis, no erat facilisi ullamcorper duo. Causae option duo id, eirmod numquam mei eu, et vim ipsum liberavisse. Efficiantur deterruisset sed in. Aperiri epicurei consulatu ea duo. Ut cum inani voluptaria interesset.

Vim apeirian recteque eu. Ad sea graeci dicunt, vix brute velit ad. Semper nominati nam ne, te mea vero omnes tacimates. Porro dicant tamquam duo eu. Et eam consul noluisse electram, impetus conclusionemque pri ut.`
];

const bg = ["#90C3D4", "#FAD9EA", "#FCFCB1"];

@Radium
class Content extends Component {
    static propTypes = {
        index: PropTypes.number,
        targeting: PropTypes.object
    };
    render() {
        const {index, targeting} = this.props;
        let ad;
        if (index !== 2) {
            ad = (
                <div style={styles.mr}>
                    <Gpt
                        adUnitPath="/4595/nfl.test.open"
                        slotSize={index === 0 ? [728, 90] : [300, 250]}
                        targeting={targeting}
                    />
                </div>
            );
        }

        return (
            <div style={{backgroundColor: bg[index]}}>
                <div style={styles.main}>
                    {ad}
                    <p>
                        <span style={styles.title}>Content {index}</span>
                        <span style={styles.description}>
                            Lorem ipsum dolor sit amet, accusamus complectitur
                            an est
                        </span>
                        {contents[index]}
                    </p>
                </div>
            </div>
        );
    }
}

export default Content;
